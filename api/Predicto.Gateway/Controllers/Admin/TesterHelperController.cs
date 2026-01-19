using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Extensions;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Controllers.Admin
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TesterHelperController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IRoomUsersService _roomUserService;

        public TesterHelperController(IRoomService roomService, IRoomUsersService roomUsersService)
        {
            _roomService = roomService;
            _roomUserService = roomUsersService;
        }

        [HttpPost("join-room-mock")]
        [Authorize]
        public async Task<IActionResult> JoinRoom(int roomId, int userId)
        {

            await _roomUserService.JoinRoomAsync(roomId, userId);
            return Ok();
        }
        [HttpPost("leave-room-mock")]
        [Authorize]
        public async Task<IActionResult> LeaveRoom(int roomId, int userId)
        {

            await _roomUserService.LeaveRoomAsync(roomId, userId);
            return Ok();
        }
    }
}