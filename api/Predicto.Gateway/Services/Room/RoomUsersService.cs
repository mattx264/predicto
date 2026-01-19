using Microsoft.AspNetCore.SignalR;
using Predicto.Database.Entities.Room;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Hubs;
using Predicto.Gateway.Hubs.Room;
using Predicto.Gateway.Middleware.Redis;

namespace Predicto.Gateway.Services.Room
{
    public class RoomUsersService : IRoomUsersService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoomService _roomService;
        private readonly IHubContext<RoomsHub> _roomsHub;
        private readonly IHubContext<RoomHub> _roomHub;
        private readonly ICacheService _cache;

        public RoomUsersService(IUnitOfWork unitOfWork, IRoomService roomService, ICacheService cache,
            IHubContext<RoomsHub> roomsHub,
            IHubContext<RoomHub> roomHub)
        {
            _unitOfWork = unitOfWork;
            _roomService = roomService;
            _roomsHub = roomsHub;
            _roomHub = roomHub;
            _cache = cache;
        }
        public async Task<List<RoomUserDetailsDTO>> GetUsersAsync(int roomId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(roomId);
            if (room == null)
            {
                throw new Exception("Room not exists: " + roomId);
            }
            var users = room.Participants.Select(p => new RoomUserDetailsDTO
            {
                Id = p.UserId,
                Username = p.User.Name,
                Points = 999,//TODO p.Points,
                Hit = 888,//TODO p.Hit
            }).ToList();
            return users;
        }
        public async Task JoinRoomAsync(int roomId, int userId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(roomId);

            if (room == null)
            {
                throw new ArgumentException("Pokój nie istnieje");
            }

            if (!room.IsActive)
            {
                throw new InvalidOperationException("Pokój nie jest aktywny");
            }

            if (room.Participants.Count >= room.MaxUsers)
            {
                throw new InvalidOperationException("Pokój jest pełny");
            }

            if (room.Participants.Any(p => p.UserId == userId))
            {
                throw new InvalidOperationException("Już jesteś w tym pokoju");
            }

            var user = await _unitOfWork.Users.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("Użytkownik nie istnieje");
            }

            var roomUser = new RoomUserEntity()
            {
                UserId = userId,
                RoomId = roomId,
                UserRoomRole = UserRoomRole.Participant,
                IsActive = true,
            };

            await _unitOfWork.RoomUserRepository.AddAsync(roomUser, userId);
            await _unitOfWork.CompleteAsync();

            var updatedRoom = await _roomService.GetRoomByIdAsync(roomId);

            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("RoomUpdated", updatedRoom);
            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("UsersUpdated", await GetUsersAsync(roomId));

            await _roomsHub.Clients.Group("SignalR Users").SendAsync("RoomUpdated", updatedRoom);

            //await _roomsHub.Clients.Group("SignalR Users").SendAsync("UserJoined", new
            //{
            //    roomId = roomId,
            //    userId = userId,
            //    userName = user.Name,
            //    participantsCount = updatedRoom.Users.Count
            //});
        }

        public async Task LeaveRoomAsync(int roomId, int userId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(roomId);

            if (room == null)
            {
                throw new ArgumentException("Pokój nie istnieje");
            }

            var participant = room.Participants.FirstOrDefault(p => p.UserId == userId);

            if (participant == null)
            {
                throw new InvalidOperationException("Nie jesteś członkiem tego pokoju");
            }

            _unitOfWork.RoomUserRepository.Remove(participant);
            await _unitOfWork.CompleteAsync();

            var updatedRoom = await _roomService.GetRoomByIdAsync(roomId);

            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("RoomUpdated", updatedRoom);
            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("UsersUpdated", await GetUsersAsync(roomId));

            await _roomsHub.Clients.Group("SignalR Users").SendAsync("RoomUpdated", updatedRoom);

            //await _roomsHub.Clients.Group("SignalR Users").SendAsync("UserLeft", new
            //{
            //    roomId = roomId,
            //    userId = userId,
            //    participantsCount = updatedRoom.Users.Count
            //});
        }
    }

    public interface IRoomUsersService
    {
        Task<List<RoomUserDetailsDTO>> GetUsersAsync(int roomId);
        Task JoinRoomAsync(int roomId, int userId);
        Task LeaveRoomAsync(int roomId, int userId);
    }
}
