using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameBlogController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GameBlogController(IUnitOfWork unitOfWork)
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
            var games=await _unitOfWork.Game.GetAllAsync();
            return Ok(games);
        }
        

    }
}
