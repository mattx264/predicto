using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;
using Predicto.Database.Interfaces;

namespace Predicto.Database.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, IEntity
    {
        protected readonly PredictoDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(PredictoDbContext context)
        {
            _context = context;

            _dbSet = _context.Set<T>();
        }

        public async Task<T?> GetByIdAsync(int id)
        {

            return await _dbSet.FirstOrDefaultAsync(e => e.Id == id && e.IsActive);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.Where(e => e.IsActive).ToListAsync();
        }

        public async Task AddAsync(T entity, int userId)
        {
            var timestamp = DateTime.Now;

            //CascadeActivate(entity, userId, timestamp, new HashSet<object>(ReferenceEqualityComparer.Instance));
            entity.ModifiedDate = DateTime.Now;
            entity.ModifiedBy = userId;
            entity.CreatedDate = DateTime.Now;
            entity.CreatedBy = userId;
            await _dbSet.AddAsync(entity);
        }

        public void Update(T entity, int userId)
        {
            entity.ModifiedDate = DateTime.Now;
            entity.ModifiedBy = userId; //to be replaced
            _dbSet.Update(entity);
        }

        public void Remove(T entity)
        {
            entity.IsActive = false;
            _dbSet.Update(entity);
            //_dbSet.Remove(entity);
        }

        public Task<T?> FindAsync(Func<T, bool> value)
        {
            var originalPredicate = value;
            value = x => x.IsActive && originalPredicate(x);
            return Task.FromResult(_dbSet.FirstOrDefault(value));
        }

        public Task<IEnumerable<T>> WhereAsync(Func<T, bool> predicate)
        {
            var originalPredicate = predicate;
            predicate = x => x.IsActive && originalPredicate(x);
            return Task.FromResult(_dbSet.Where(predicate));
        }

        private void CascadeActivate(object? candidate, int userId, DateTime timestamp, HashSet<object> visited)
        {
            if (candidate is null || visited.Contains(candidate) || candidate is not IEntity entity)
            {
                return;
            }

            visited.Add(candidate);

            entity.IsActive = true;


            entity.CreatedDate = timestamp;
            entity.CreatedBy = userId;

            entity.ModifiedDate = timestamp;
            entity.ModifiedBy = userId;

            foreach (var property in candidate.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public))
            {
                if (!property.CanRead || property.GetIndexParameters().Length > 0 || property.PropertyType == typeof(string))
                {
                    continue;
                }

                var value = property.GetValue(candidate);

                if (value is null)
                {
                    continue;
                }

                if (value is IEnumerable enumerable)
                {
                    foreach (var item in enumerable)
                    {
                        CascadeActivate(item, userId, timestamp, visited);
                    }

                    continue;
                }

                CascadeActivate(value, userId, timestamp, visited);
            }
        }

        private sealed class ReferenceEqualityComparer : IEqualityComparer<object>
        {
            public static ReferenceEqualityComparer Instance { get; } = new ReferenceEqualityComparer();

            private ReferenceEqualityComparer()
            {
            }

            public new bool Equals(object? x, object? y)
            {
                return ReferenceEquals(x, y);
            }

            public int GetHashCode(object obj)
            {
                return RuntimeHelpers.GetHashCode(obj);
            }
        }
    }
}
