using Predicto.Database.Entities;
using Predicto.Database.Entities.Blog;
using Predicto.Database.Entities.Room;
using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces.Repositories;
using Predicto.Database.Repositories;
using Predicto.Database.Repositories.Sport;

namespace Predicto.Database.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<UserEntity> Users { get; }
        IRepository<RoomEntity> Rooms { get; }
        IRepository<SportCategoryEntity> SportCategory { get; }
        IRepository<TournamentEntity> Tournament { get; }
        IRepository<TeamEntity> Team { get; }
        IRepository<TournamentTeamEntity> TournamentTeamRepository { get; }
        IRepository<PlayerEntity> Player { get; }
        IRepository<TeamPlayerEntity> TeamPlayerRepository { get; }
        IRepository<GameEntity> Game { get; }
        IRepository<ArticleEntity> Article { get; }
        IGameGroupRepository GameGroupRepository { get; }
        IRepository<RoomUserBetEntity> RoomUserBetRepository { get; }
        IRepository<PlayerTournamentEntity> PlayerTournamentRepository { get; }
        IRepository<RoomUserEntity> RoomUserRepository { get; }

        
        Task<int> CompleteAsync(); // SaveChanges
    }
}
