using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;

namespace Predicto.Database.Interfaces.Repositories
{
    public class RoomRepository : Repository<RoomEntity>
    {
        public RoomRepository(PredictoDbContext context) : base(context)
        {
        }
        
        public override async Task<IEnumerable<RoomEntity>> GetAllAsync()
        {
            return await _dbSet
                .Include(r => r.Tournament)
                .Include(r => r.CreatedByUser)
                .Include(r => r.Participants)
                .ToListAsync();
        }
        
        public override async Task<RoomEntity?> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(r => r.Tournament)
                .Include(r => r.CreatedByUser)
                   .Include(r => r.Participants)
                .FirstOrDefaultAsync(r => r.Id == id);
        }
    }
}