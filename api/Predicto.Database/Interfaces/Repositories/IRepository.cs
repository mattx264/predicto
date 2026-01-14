using Microsoft.EntityFrameworkCore;
using Predicto.Database;
using Predicto.Database.Interfaces;
using System;

//public class Repository<T> : IRepository<T> where T : class, IEntity
//{
//    protected readonly PredictoDbContext _context;
//    protected readonly DbSet<T> _dbSet;

//    public Repository(PredictoDbContext context)
//    {
//        _context = context;
//        _dbSet = _context.Set<T>();
//    }

//    public virtual async Task<T?> GetByIdAsync(int id)
//    {
//        return await _dbSet.FindAsync(id);
//    }

//    public virtual async Task<IEnumerable<T>> GetAllAsync()
//    {
//        return await _dbSet.ToListAsync();
//    }

//    public async Task AddAsync(T entity, int userId)
//    {
//        entity.IsActive = true;
//        entity.CreatedDate = DateTime.Now;
//        entity.ModifiedDate = DateTime.Now;
//        entity.CreatedBy = userId; //to be replaced
//        entity.ModifiedBy = userId; //to be replaced
//        await _dbSet.AddAsync(entity);
//    }

//    public void Update(T entity, int userId)
//    {

//        _dbSet.Update(entity);
//    }

//    public void Remove(T entity)
//    {

//      //  _dbSet.Remove(entity);
//    }

//    public Task<T?> FindAsync(Func<T, bool> value)
//    {
//        var originalPredicate = value;
//        value = x => x.IsActive && originalPredicate(x);
//        return Task.FromResult(_dbSet.FirstOrDefault(value));
//    }
//    public Task<IEnumerable<T>> WhereAsync(Func<T, bool> predicate)
//    {
//        var originalPredicate = predicate;
//        predicate = x => x.IsActive && originalPredicate(x);

//        return Task.FromResult(_dbSet.Where(predicate));
//    }
//}

public interface IRepository<T> where T : IEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity, int userId);
    void Update(T entity, int userId);
    void Remove(T entity);
    Task<T?> FindAsync(Func<T, bool> value);
    Task<IEnumerable<T>> WhereAsync(Func<T, bool> predicate);
}