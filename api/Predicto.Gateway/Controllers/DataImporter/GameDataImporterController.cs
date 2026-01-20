using Microsoft.AspNetCore.Mvc;

namespace Predicto.Gateway.Controllers.DataImporter
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameDataImporterController : ControllerBase
    {
        //new gaal

        [HttpPost("new-gool")]
        public async Task<IActionResult> NewGool(int gameId,int teamId)
        {
            return Ok();
        }
    }
}
