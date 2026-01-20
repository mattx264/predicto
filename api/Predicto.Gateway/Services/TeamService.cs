using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Group;
using Predicto.Gateway.DTO.Sport;
using System.Linq;

namespace Predicto.Gateway.Services
{
    public class TeamService : ITeamService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TeamService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<TeamListDto>> GetAll(int tournamentId)
        {
            var tournamentTeams = await _unitOfWork.TournamentTeamRepository
                .WhereAsync(tt => tt.TournamentEntityId == tournamentId);
            return tournamentTeams.Select(x => new TeamListDto(x.TeamEntity)).ToList();
        }
        public async Task<List<TeamListRankingDto>> GetRanking(int tournamentId)
        {
            var tournamentTeams = await _unitOfWork.TournamentTeamRepository
                .WhereAsync(tt => tt.TournamentEntityId == tournamentId);

            return tournamentTeams.Select(x => new TeamListRankingDto(x)
            {
                Coach = x.TeamEntity.Coach,
                Players = x.TeamEntity.Players?.Select(gp => new PlayerBasicInfoDto
                {
                    Id = gp.Id,
                    Name = gp.Name,
                    ImageUrl = gp.PhotoUrl ?? "",
                    Position = gp.Position ?? "",
                    ShirtNumber = gp.NationalTeamNumber
                }).ToList() ?? new List<PlayerBasicInfoDto>()
            }).ToList();
        }

        public async Task<TeamDetailsDto> GetById(int id, int tournamentId)
        {
            var team = await _unitOfWork.Team.GetByIdAsync(id);
           

            return new TeamDetailsDto(team)
            {
                Slug = team.Slug,
                Coach = team.Coach,
                Players = team.Players.Select(gp => new PlayerBasicInfoDto()
                {
                    Id = gp.Id,
                    Name = gp.Name,
                    ImageUrl = gp.PhotoUrl ?? "",
                    Position = gp.Position ?? "",
                    ShirtNumber = gp.NationalTeamNumber
                }).ToList()
            };
        }
    }
    public interface ITeamService
    {
        Task<List<TeamListRankingDto>> GetRanking(int tournamentId);
        Task<List<TeamListDto>> GetAll(int tournamentId);
        Task<TeamDetailsDto> GetById(int id, int tournamentId);
    }
}
