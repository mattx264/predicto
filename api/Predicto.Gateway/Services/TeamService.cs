using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Group;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Gateway.Services
{
    public class TeamService : ITeamService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TeamService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<TeamListDto>> GetAll()
        {
            var teams = await _unitOfWork.Team.GetAllAsync();
            return teams.Select(x => new TeamListDto(x)).ToList();
        }

        public async Task<TeamDetailsDto> GetById(int id)
        {
            var team = await _unitOfWork.Team.GetByIdAsync(id);

            return new TeamDetailsDto(team)
            {
                Slug = team.Slug,
                Coach = team.Coach,
                FormLastGames = team.FormLastGames,
                Players = team.Players.Select(gp => new PlayerBasicInfoDto()
                {
                    Id = gp.Id,
                    Name = gp.Name,
                    ImageUrl = gp.PhotoUrl,
                    Position = gp.Position,
                    ShirtNumber = gp.ShirtNumber
                }).ToList()
            };
        }
    }
    public interface ITeamService
    {
        Task<List<TeamListDto>> GetAll();
        Task<TeamDetailsDto> GetById(int id);
    }
}
