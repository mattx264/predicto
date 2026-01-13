using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities.Room;
using Predicto.Database.Repositories;

namespace Predicto.Database.Interfaces.Repositories
{
    public class RoomRepository : Repository<RoomEntity>
    {
        public RoomRepository(PredictoDbContext context) : base(context)
        {
        }

        //public override async Task<IEnumerable<RoomEntity>> GetAllAsync()
        //{
        //    return await _dbSet
        //        .Include(r => r.Tournament)
        //        .Include(r => r.Participants)
        //            .ThenInclude(p => p.User) 
        //        .ToListAsync();
        //}

        //public override async Task<RoomEntity?> GetByIdAsync(int id)
        //{
        //    return await _dbSet
        //        .Include(r => r.Tournament)
        //        .Include(r => r.Participants)
        //            .ThenInclude(p => p.User)  
        //        .FirstOrDefaultAsync(r => r.Id == id);
        //}
    }
}