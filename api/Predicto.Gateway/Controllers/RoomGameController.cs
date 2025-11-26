using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.Extensions;
using Predicto.Gateway.Services;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomGameController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IGameRoomService _gameRoomService;

        public RoomGameController(IRoomService roomService, IGameRoomService gameRoomService)
        {
            _roomService = roomService;
            _gameRoomService = gameRoomService;
        }

        [HttpGet("all")]
        [Authorize]
        public async Task<ActionResult<List<RoomGameDto>>> GetAllGames(int roomId)
        {
            try
            {
                var userId = User.GetUserId();
                var room = await _gameRoomService.GetGames(roomId, userId);
                return Ok(room);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }

        [HttpGet("other")]
        [Authorize]
        public async Task<ActionResult<List<OtherGameBetSimpleDto>>> GetOtherBet(int roomId,int gameId)
        {
            try
            {
                var userId = User.GetUserId();
                var room = await _gameRoomService.GetOtherBet(roomId, gameId, userId);
                return Ok(room);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> BetGame(RoomGameBetDto roomGameBets)
        {
            try
            {
                var userId = User.GetUserId();
                await _gameRoomService.BetGame(roomGameBets, userId);
                return Ok();
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }


        }

    }
}