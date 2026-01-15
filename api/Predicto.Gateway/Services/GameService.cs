using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Group;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Gateway.Services
{
    public class GameService : IGameService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GameService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<GameListDto>> GetAll(int id)
        {

            var games = await _unitOfWork.Game.WhereAsync(x=>x.TournamentId==id);
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
        public async Task<GameDetailsDto> GetByIdAsync(int id)
        {
            var game = await _unitOfWork.Game.GetByIdAsync(id);
            if (game == null)
            {
                throw new Exception("Game not found for id " + id);
            }
            var prevGames = await _unitOfWork.Game.WhereAsync(g => g.Teams.Any(t => t.TeamId == game.Teams.First().TeamId || t.TeamId == game.Teams.Last().TeamId));
            return new GameDetailsDto
            {
                Id = game.Id,
                StartTime = game.StartGame,
                Teams = game.Teams.Select(x => new GameDetailsTeamDto()
                {
                    Name = x.Team.Name,
                    Id = x.TeamId,
                    LogoUrl = x.Team.ImageUrl,
                    Tactic = x.Tactics,
                    Coach = x.Team.Coach,
                    FormLastGames = "",//x.Team.FormLastGames,

                    Players = x.Team.Players.Select(gp => new PlayerBasicInfoDto()
                    {
                        Id = gp.Id,
                        Name = gp.Name,
                        ImageUrl = gp.PhotoUrl??"",
                        Position = gp.Position??"",
                        ShirtNumber = gp.NationalTeamNumber,
                    }).ToList()

                }).ToList(),
                FinalScore = game.FinalScore,
                TournamentId = game.TournamentId,
                Referee = game.Referee,
                HeadToHead = prevGames.Select(pg => new HeadToHeadDto()
                {
                    GameId = pg.Id,
                    GameDate = pg.StartGame,
                    FinalScore = pg.FinalScore,
                    TeamId1 = pg.Teams.First().TeamId,
                    TeamId2 = pg.Teams.Last().TeamId,
                    TeamName1 = pg.Teams.First().Team.Name,
                    TeamName2 = pg.Teams.Last().Team.Name,
                }).ToList()
            };
        }

    }
    public interface IGameService
    {
        Task<List<GameListDto>> GetAll(int id);
        Task<GameDetailsDto> GetByIdAsync(int id);

    }
}
