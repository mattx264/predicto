using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Repositories
{
    internal class UserRepository : Repository<UserEntity>
    {
        protected readonly PredictoDbContext _context;
        protected readonly DbSet<UserEntity> _dbSet;

        public UserRepository(PredictoDbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<UserEntity>();
        }

    }
}
