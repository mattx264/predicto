using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameBlogController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameBlogController(IGameService gameService)
        {
            _gameService = gameService;
        }
        [HttpGet("tournament/{id}")]
        public async Task<IActionResult> GetTeamsByTournamentId(int id)
        {
            var games = await _gameService.GetAll();
            return Ok(games);
        }
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetGameDetailsByGame(int id)
        {
            var game = await _gameService.GetByIdAsync(id);
            return Ok(game);
        }

    }
}
