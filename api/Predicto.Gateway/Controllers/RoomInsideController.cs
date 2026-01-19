using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Extensions;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TesterHelperController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public TesterHelperController(IRoomService roomService)
        {
            _roomService = roomService;
        }
      

        [HttpPost("{gameid}/sent-invitation-email")]
        [Authorize]
        public async Task<IActionResult> SentInvitationEmail(int gameid, string emial)
        {
            try
            {
                throw new NotImplementedException();
                //var userId = User.GetUserId();
                // await _roomService.SentInvitationEmail(gameid, emial, userId);
                // return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "error leaving room", error = ex.Message });
            }
        }
    }
}