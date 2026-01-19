using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Extensions;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Authorize]

    [Route("api/[controller]")]
    public class RoomUsersController : ControllerBase
    {
        private readonly IRoomUsersService _roomUsersService;

        public RoomUsersController(IRoomUsersService roomUsersService)
        {
            _roomUsersService = roomUsersService;
        }

        [HttpGet("GetUsers")]
        public async Task<ActionResult<List<RoomUserDetailsDTO>>> GetUsers(int roomId)
        {
           var users = await _roomUsersService.GetUsersAsync(roomId);
           return Ok(users);
        }


        [HttpPost("{id}/join")]
        [Authorize]
        public async Task<IActionResult> JoinRoom(int id)
        {
            try
            {
                var userId = User.GetUserId();
                await _roomUsersService.JoinRoomAsync(id, userId);
                return Ok(new { message = "Pomyślnie dołączono do pokoju!" });
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
                return StatusCode(500, new { message = "error by joining to room", error = ex.Message });
            }
        }

        [HttpPost("{id}/leave")]
        [Authorize]
        public async Task<IActionResult> LeaveRoom(int id)
        {
            try
            {
                var userId = User.GetUserId();
                await _roomUsersService.LeaveRoomAsync(id, userId);
                return Ok(new { message = "Pomyślnie opuszczono pokój." });
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