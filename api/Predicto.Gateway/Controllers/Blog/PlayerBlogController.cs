using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Blog;
using Predicto.Gateway.Services;
using System.Linq;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerBlogController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public PlayerBlogController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("by-id/{playerId}")]
        public async Task<IActionResult> GetPlayerById(int playerId)
        {
            var player = await _unitOfWork.Player.FindAsync(a => a.Id == playerId);
            if (player == null)
            {
                return NotFound();
            }
            var team = await _unitOfWork.Team.FindAsync(t => t.Players.Contains(player));
            if (team == null)
            {
                return NotFound();
            }
            var playerTournamentEntity = await _unitOfWork.PlayerTournamentRepository.FindAsync(pt => pt.PlayerId == player.Id && pt.TournamentId == 1);


            return Ok(new PlayerBlogDto()
            {
                Id = player.Id,
                Name = player.Name,
                Age = player.Age,
                Position = player.Position,
                TeamName = team.Name,
                Slug = player.Slug,
                FirstName = player.FirstName,
                LastName = player.LastName,
                Birthday = player.Birthday,
                BirthPlace = player.BirthPlace,
                BirthCountry = player.BirthCountry,
                Nationality = player.Nationality,
                Height = player.Height,
                Weight = player.Weight,
                ShirtNumber = player.ShirtNumber,
                PhotoUrl = player.PhotoUrl,
                MarketValue = player.MarketValue,
                Bio = player.Bio,
                Assists = playerTournamentEntity?.Assists,
                PassingAccuracy = playerTournamentEntity?.PassingAccuracy,
                BallsRecovered = playerTournamentEntity?.BallsRecovered,
                Goals = playerTournamentEntity?.Goals ?? 0,
                Minutesplayed = playerTournamentEntity?.Minutesplayed ?? 0,
                Tackles = playerTournamentEntity?.Tackles,
                TotalAttempts = playerTournamentEntity?.TotalAttempts,
                Cleansheets = playerTournamentEntity?.Cleansheets,
                DistanceCovered = playerTournamentEntity?.DistanceCovered,
                RedCards = playerTournamentEntity?.RedCards ?? 0,
                Saves = playerTournamentEntity?.Saves,
                YellowCards = playerTournamentEntity?.YellowCards ?? 0,
                TopSpeed = playerTournamentEntity?.TopSpeed,
                MatchesPlayed = playerTournamentEntity?.MatchesPlayed ?? 0


            });
        }

    }
}
