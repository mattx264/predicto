using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Repositories.Sport
{
    public class TournamentRepository : Repository<TournamentEntity>
    {
        protected readonly PredictoDbContext _context;
        protected readonly DbSet<TournamentEntity> _dbSet;

        public TournamentRepository(PredictoDbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<TournamentEntity>();
        }

    }
}
