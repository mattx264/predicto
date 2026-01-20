using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;
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
        [HttpGet("get-tournament-by-id-blog/{id}")]
        public async Task<ActionResult<List<GameListDto>>> GetTeamsByTournamentId(int id)
        {
            var games = await _gameService.GetAll(id);
            return Ok(games);
        }
        [HttpGet("details-blog/{id}")]
        public async Task<ActionResult<GameListDto>> GetGameDetailsByGame(int id)
        {
            var game = await _gameService.GetByIdAsync(id);
            return Ok(game);
        }

    }
}
