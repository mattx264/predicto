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
            entity.IsActive = true;
            entity.CreatedDate = DateTime.Now;
            entity.ModifiedDate = DateTime.Now;
            entity.CreatedBy = userId; //to be replaced
            entity.ModifiedBy = userId; //to be replaced
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
    }
}
