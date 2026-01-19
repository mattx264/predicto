using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.DTO.Rooms;
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

        [HttpPost("create-room")]
        [Authorize]
        public async Task<ActionResult<RoomDTO>> CreateRoom([FromBody] NewRoomDto newRoomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = User.GetUserId();
                var room = await _roomService.CreateRoomAsync(newRoomDto, userId);
                //return CreatedAtAction(nameof(GetRoom), new { id = room.Id }, room);
                return room;
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
        public async Task<ActionResult<List<RoomDTO>>> GetRooms()
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
        public async Task<ActionResult<RoomDTO>> GetRoom(int id)
        {

            var userId = User.TryGetUserId();
            var room = await _roomService.GetRoomByIdAsync(id);
            if (room == null)
                return NotFound();
            return Ok(room);
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<ActionResult<List<RoomDTO>>> GetMyRooms()
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


       
    }
}