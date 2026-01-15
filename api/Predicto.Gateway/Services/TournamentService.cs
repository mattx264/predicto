using Predicto.Database.Interfaces;
using Predicto.Database.Repositories.Sport;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Gateway.Services
{
    public class TournamentService : ITournamentService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TournamentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<TournamentDto>> GetAllAsync()
        {
            return (await _unitOfWork.Tournament.GetAllAsync()).Select(
               t => new TournamentDto
               {
                   Id = t.Id,
                   Name = t.Name,
                   SportCategoryId = t.SportCategoryId,
                   Description = t.Description,
                   League = t.League,
                   MatchesCount = t.MatchesCount,
                   StartDate = t.StartDate,
                   EndDate = t.EndDate,
                   LogoUrl = t.LogoUrl
               }).OrderBy(x => x.StartDate);
        }
    }

    public interface ITournamentService
    {
        Task<IEnumerable<TournamentDto>> GetAllAsync();
    }
}