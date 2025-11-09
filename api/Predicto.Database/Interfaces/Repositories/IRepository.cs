using Microsoft.EntityFrameworkCore;
using Predicto.Database;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly PredictoDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(PredictoDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public virtual async Task<T?> GetByIdAsync(int id)  
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()  
    {
        return await _dbSet.ToListAsync();
    }

    public async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public void Update(T entity)
    {
        _dbSet.Update(entity);
    }

    public void Remove(T entity)
    {
        _dbSet.Remove(entity);
    }

    public Task<T?> FindAsync(Func<T, bool> value)
    {
        return Task.FromResult(_dbSet.FirstOrDefault(value));
    }
    public Task<IEnumerable<T>> WhereAsync(Func<T, bool> predicate)
    {
        return Task.FromResult(_dbSet.Where(predicate));
    }
}

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    void Update(T entity);
    void Remove(T entity);
    Task<T?> FindAsync(Func<T, bool> value);
    Task<IEnumerable<T>> WhereAsync(Func<T, bool> predicate);
}