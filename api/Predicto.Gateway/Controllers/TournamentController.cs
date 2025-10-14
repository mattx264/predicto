using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentController : ControllerBase
    {
        private ITournamentService _tournamentService;

        public TournamentController(ITournamentService tournamentService)
        {
            _tournamentService = tournamentService;
        }
        [HttpGet]   
        public async Task<IActionResult> GetTournamentsAsync()
        {


            return Ok(await _tournamentService.GetAllAsync());
        }
    }
}
