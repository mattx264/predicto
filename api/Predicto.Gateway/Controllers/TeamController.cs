using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }
        [HttpGet("ranking-by-tournament/{id}")]
        public async Task<ActionResult<List<TeamListDto>>> GetRankingByTournamentId(int id)
        {

            var teams = await _teamService.GetRanking(id);
            return Ok(teams);
        }
        [HttpGet("game-by-tournament/{id}")]
        public async Task<ActionResult<List<TeamListDto>>> GetTeamsByTournamentId(int tournamentId)
        {

            var teams = await _teamService.GetAll(tournamentId);
            return Ok(teams);
        }
        [HttpGet("get-by-id/{id}/{tournamentId}")]
        public async Task<ActionResult<TeamDetailsDto>> GetTeamById(int id, int tournamentId)
        {
            var team = await _teamService.GetById(id, tournamentId);
            return Ok(team);
        }


    }
}
