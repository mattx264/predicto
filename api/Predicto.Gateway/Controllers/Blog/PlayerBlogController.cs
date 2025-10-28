using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Blog;
using Predicto.Gateway.Services;

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
            var team = await _unitOfWork.Team.FindAsync(t => t.Id == player.Id);

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
            });
        }

    }
}
