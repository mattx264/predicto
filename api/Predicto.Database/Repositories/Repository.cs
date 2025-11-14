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
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            entity.IsActive = true;
            await _dbSet.AddAsync(entity);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Remove(T entity)
        {
            //entity.IsActive = false;
            //_dbSet.Update(entity);
            _dbSet.Remove(entity);
        }

        public Task<T?> FindAsync(Func<T, bool> value)
        {
            //isActive check
            return Task.FromResult(_dbSet.FirstOrDefault(value));
        }

        public Task<IEnumerable<T>> WhereAsync(Func<T, bool> predicate)
        {
            //isActive check
            return Task.FromResult(_dbSet.Where(predicate));
        }
    }
}
