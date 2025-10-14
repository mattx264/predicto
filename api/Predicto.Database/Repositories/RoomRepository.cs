using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Repositories
{
    public class RoomRepository : Repository<RoomEntity>
    {
        protected readonly PredictoDbContext _context;
        protected readonly DbSet<RoomEntity> _dbSet;

        public RoomRepository(PredictoDbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<RoomEntity>();
        }
      
    }
}
