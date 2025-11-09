using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Group;

namespace Predicto.Gateway.Services
{
    public class TeamService : ITeamService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TeamService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<GroupDto>> GetAll()
        {
            throw new NotImplementedException();
        }
    }
    public interface ITeamService
    {
        Task<List<GroupDto>> GetAll();
    }
}
