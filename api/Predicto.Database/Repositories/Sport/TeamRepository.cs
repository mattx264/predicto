using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities.Sport;

namespace Predicto.Database.Repositories.Sport
{
    public class TeamRepository : Repository<TeamEntity>
    {
        protected readonly PredictoDbContext _context;
        protected readonly DbSet<TeamEntity> _dbSet;

        public TeamRepository(PredictoDbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<TeamEntity>();
        }
        public async Task<IEnumerable<TeamEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

    }
}
