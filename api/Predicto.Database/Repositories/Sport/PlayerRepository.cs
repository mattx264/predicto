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
    public class PlayerRepository : Repository<PlayerEntity>
    {
        protected readonly PredictoDbContext _context;
        protected readonly DbSet<PlayerEntity> _dbSet;

        public PlayerRepository(PredictoDbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<PlayerEntity>();
        }

    }
}
