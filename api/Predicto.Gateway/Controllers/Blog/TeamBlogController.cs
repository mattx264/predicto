using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamBlogController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public TeamBlogController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("tournament/{id}")]
        public async Task<IActionResult> GetTeamsByTournamentId(int id)
        {
            //var tournament = await _unitOfWork.Tournament.GetByIdAsync(id);
            //if (tournament == null)
            //{
            //    return NotFound();
            //}
            //return Ok(tournament.Teams);
            var teams=await _unitOfWork.Team.GetAllAsync();
            return Ok(teams);
        }
        [HttpGet("all-teams")]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _unitOfWork.Team.GetAllAsync();
            return Ok(teams);
        }
        [HttpGet("by-team/{teamId}")]
        public async Task<IActionResult> GetArticlesByTeamId(int teamId)
        {
            var team = await _unitOfWork.Team.FindAsync(a => a.Id == teamId);
            return Ok(team);
        }

    }
}
