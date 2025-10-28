using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }
        [HttpPost]   
        public async Task<IActionResult> CreateRoom([FromBody] NewRoomDto newRoomDto)
        {
            await _roomService.CreateRoomAsync(newRoomDto);
         
            return Ok();
        }
    }
}
