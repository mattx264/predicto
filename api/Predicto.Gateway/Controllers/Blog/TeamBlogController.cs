using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamBlogController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamBlogController(ITeamService teamService)
        {
            _teamService = teamService;
        }
        [HttpGet("game-by-tournament/{id}")]
        public async Task<IActionResult> GetTeamsByTournamentId(int id)
        {
           
            var teams=await _teamService.GetAll();
            return Ok(teams);
        }
        [HttpGet("get-by-id/{id}/{tournamentId}")]
        public async Task<IActionResult> GetTeamById(int id, int tournamentId)
        {
            var team = await _teamService.GetById(id, tournamentId);
            return Ok(team);
        }


    }
}
