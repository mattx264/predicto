using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Group;

namespace Predicto.Gateway.Services
{
    public class GroupService : IGroupService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GroupService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<GroupDto>> GetAllGroups()
        {
            var groups = await _unitOfWork.GameGroupRepository.GetAll();
            // var teams= await _unitOfWork.Team.GetAllAsync();
            return groups.Select(g => new GroupDto
            {
                Id = g.Id,
                Name = g.Name,
                Teams = g.GameGroupTeam.Select(t => new GroupTeamDto
                {
                    TeamName = t.Team.Name,
                    Won = t.Won,
                    Lost = t.Lost,
                    Drawn = t.Drawn,
                    Played = t.Played,
                    Points = t.Points,
                    GoalsDiference = t.GoalsDiference
                }).ToList()
            }).ToList();
        }
    }
    public interface IGroupService
    {
        Task<List<GroupDto>> GetAllGroups();
    }
}
