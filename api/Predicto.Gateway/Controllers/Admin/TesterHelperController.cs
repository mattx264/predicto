using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Database.UnitOfWork;
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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoomService _roomService;
        private readonly IRoomUsersService _roomUserService;

        public TesterHelperController(IUnitOfWork unitOfWork, IRoomService roomService, IRoomUsersService roomUsersService)
        {
            _unitOfWork = unitOfWork;
            _roomService = roomService;
            _roomUserService = roomUsersService;
        }
        [HttpPost("clear-all-bet-in-room-mock")]
        public async Task<IActionResult> ClearAllBetInRoomMock(int roomId, int userId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(roomId);
            if (room == null)
            {
                return NotFound();
            }

            // Load participants for the room
            var participant = await _unitOfWork.RoomUserRepository.FindAsync(p => p.RoomId == roomId &&p.UserId == userId);
           
            if (participant != null)
            {
                // Load bets for the participant
                //var bets = await _unitOfWork.RoomUserBetRepository.WhereAsync(b => b. == participant.Id);
                foreach (var bet in participant.RoomUserBets)
                {
                    _unitOfWork.RoomUserBetRepository.Remove(bet);
                }
            }

            await _unitOfWork.CompleteAsync();
            return Ok();
        }

        [HttpPost("join-room-mock")]

        public async Task<IActionResult> JoinRoom(int roomId, int userId)
        {

            await _roomUserService.JoinRoomAsync(roomId, userId);
            return Ok();
        }
        [HttpPost("leave-room-mock")]
        public async Task<IActionResult> LeaveRoom(int roomId, int userId)
        {

            await _roomUserService.LeaveRoomAsync(roomId, userId);
            return Ok();
        }
    }
}