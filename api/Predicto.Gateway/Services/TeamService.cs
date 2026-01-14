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

        public async Task<TeamDetailsDto> GetById(int id, int tournamentId)
        {
            var team = await _unitOfWork.Team.GetByIdAsync(id);
            var teamTournament = await _unitOfWork.TournamentTeamRepository
                .FindAsync(tt => tt.TeamEntityId == id && tt.TournamentEntityId == tournamentId);
            if (teamTournament == null)
            {

            }

            return new TeamDetailsDto(team)
            {
                Slug = team.Slug,
                Coach = team.Coach,
                FormLastGames = teamTournament.FormLastGames,
                Players = team.Players.Select(gp => new PlayerBasicInfoDto()
                {
                    Id = gp.Id,
                    Name = gp.Name,
                    ImageUrl = gp.PhotoUrl,
                    Position = gp.Position,
                    ShirtNumber = gp.NationalTeamNumber
                }).ToList()
            };
        }
    }
    public interface ITeamService
    {
        Task<List<TeamListDto>> GetAll();
        Task<TeamDetailsDto> GetById(int id, int tournamentId);
    }
}
