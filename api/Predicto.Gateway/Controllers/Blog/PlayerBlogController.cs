using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
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
            return Ok(player);
        }

    }
}
