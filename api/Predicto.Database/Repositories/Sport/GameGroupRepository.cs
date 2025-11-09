using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Repositories.Sport
{
    public class GameGroupRepository : Repository<GameGroupEntity>, IGameGroupRepository
    {
        public GameGroupRepository(PredictoDbContext context) : base(context)
        {
        }
        public async Task<IList<GameGroupEntity>> GetAll()
        {
            return await _dbSet
              .Include(r => r.GameGroupTeam).ToListAsync();
        }
    }
    public interface IGameGroupRepository : IRepository<GameGroupEntity>
    {
        Task<IList<GameGroupEntity>> GetAll();
    }
}
