using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Group;

namespace Predicto.Gateway.Services
{
    public class GameService : IGameService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GameService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<GameListDto>> GetAll()
        {
            var games = await _unitOfWork.Game.GetAllAsync();
            return games.Select(g => new GameListDto
            {
                Id = g.Id,
                StartTime = g.StartGame,
                Teams = g.Teams.Select(x => new GameListTeamDto()
                {
                    Name = x.Team.Name,
                    Id = x.TeamId,
                    LogoUrl = x.Team.ImageUrl
                }).ToList(),

                FinalScore = g.FinalScore
            }).ToList();
        }
        //TODO : Implement GetByIdAsync to return Game details
        public async Task<GameEntity> GetByIdAsync(int id)
        {
            var game = await _unitOfWork.Game.GetByIdAsync(id);
            if (game == null)
            {
                throw new Exception("Game not found for id " + id);
            }
            return await _unitOfWork.Game.GetByIdAsync(id);
        }
    }
    public class GameListDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }

        public IList<GameListTeamDto> Teams { get; set; }
        public string? FinalScore { get; set; }

    }
    public class GameListTeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }
    }
    public interface IGameService
    {
        Task<List<GameListDto>> GetAll();
        Task<GameEntity> GetByIdAsync(int id);

    }
}
