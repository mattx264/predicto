using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.Extensions;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateRoom([FromBody] NewRoomDto newRoomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = User.GetUserId();
                var room = await _roomService.CreateRoomAsync(newRoomDto, userId);
                return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, room);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            try
            {
                int? currentUserId = null;
                if (User.Identity?.IsAuthenticated == true)
                {
                    currentUserId = User.GetUserId();
                }
                
                var rooms = await _roomService.GetRoomsAsync(currentUserId);
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "error downloading rooms", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _roomService.GetRoomByIdAsync(id);
            if (room == null)
                return NotFound();
            return Ok(room);
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyRooms()
        {
            try
            {
                var userId = User.GetUserId();
                var rooms = await _roomService.GetMyRoomsAsync(userId);
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "error fetching rooms", error = ex.Message });
            }
        }

        [HttpPost("{id}/join")]
        [Authorize]
        public async Task<IActionResult> JoinRoom(int id)
        {
            try
            {
                var userId = User.GetUserId();
                await _roomService.JoinRoomAsync(id, userId);
                return Ok(new { message = "succesfully joined room" });
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
                await _roomService.LeaveRoomAsync(id, userId);
                return Ok(new { message = "succesfully left room" });
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