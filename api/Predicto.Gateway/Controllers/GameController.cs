using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }
        [HttpGet("get-tournament-by-id/{id}")]
        public async Task<ActionResult<List<GameListDto>>> GetTeamsByTournamentId(int id)
        {
            var games = await _gameService.GetAll(id);
            return Ok(games);
        }
        [HttpGet("details/{id}")]
        public async Task<ActionResult<GameDetailsDto>> GetGameDetailsByGame(int id)
        {
            var game = await _gameService.GetByIdAsync(id);
            return Ok(game);
        }

    }
}
