using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities.Room;
using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;
using System.Text;

namespace Predicto.Database.Repositories.Room
{
    public class RoomRepository : Repository<RoomEntity>, IRoomRepository
    {
        protected readonly PredictoDbContext _context;
        protected readonly DbSet<RoomEntity> _dbSet;
        public RoomRepository(PredictoDbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<RoomEntity>();
        }

        public async Task<IQueryable<RoomEntity>> GetRoomsByGameId(int gameId)
        {
            var tournament = await _context.Set<TournamentEntity>()
                .FirstOrDefaultAsync(x => x.Games.Any(g => g.Id == gameId));
            if (tournament == null)
            {
                throw new Exception("Tournament not found for the given game ID: " + gameId);
            }
            var rooms = _dbSet.Where(x => x.TournamentId == tournament.Id);
            return rooms;
        }
    }
    public interface IRoomRepository : IRepository<RoomEntity>
    {
        Task<IQueryable<RoomEntity>> GetRoomsByGameId(int gameId);
    }
}
