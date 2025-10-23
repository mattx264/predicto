using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Sport;
using Predicto.Gateway.DTO.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
