using Predicto.Database.Interfaces;

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