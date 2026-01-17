using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Room;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Hubs;
using Predicto.Gateway.Hubs.Room;
using Predicto.Gateway.Middleware.Redis;

namespace Predicto.Gateway.Services.Room
{
    public class RoomService : IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<RoomsHub> _roomsHub;
        private readonly IHubContext<RoomHub> _roomHub;
        private readonly ICacheService _cache;

        public RoomService(
            IUnitOfWork unitOfWork,
            ICacheService cache,
            IHubContext<RoomsHub> roomsHub,
            IHubContext<RoomHub> roomHub)
        {
            _unitOfWork = unitOfWork;
            _roomsHub = roomsHub;
            _roomHub = roomHub;
            _cache = cache;
        }

        public async Task<RoomDTO> CreateRoomAsync(NewRoomDto newRoomDto, int createdByUserId)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(createdByUserId);
            if (user == null)
                throw new ArgumentException("User not found");

            var tournament = await _unitOfWork.Tournament.GetByIdAsync(newRoomDto.TournamentId);
            if (tournament == null)
                throw new ArgumentException("Tournament not found");

            var roomEntity = new RoomEntity
            {
                Name = newRoomDto.Name,
                Description = newRoomDto.Description,
                EntryFee = newRoomDto.EntryFee,
                IsPrivate = newRoomDto.IsPrivate,
                MaxUsers = newRoomDto.MaxParticipants,
                TournamentId = newRoomDto.TournamentId,
                RoomStatus = RoomStatus.Waiting,
            };
            await _unitOfWork.Rooms.AddAsync(roomEntity, createdByUserId);
            var roomUserEntity = new RoomUserEntity()
            {
                Room = roomEntity,
                UserId = createdByUserId,
                UserRoomRole = UserRoomRole.Admin
            };

            await _unitOfWork.RoomUserRepository.AddAsync(roomUserEntity, createdByUserId);
            await _unitOfWork.CompleteAsync();

            var roomDto = new RoomDTO
            {
                Id = roomEntity.Id,
                Name = roomEntity.Name,
                Description = roomEntity.Description,
                EntryFee = roomEntity.EntryFee,
                Users = new List<RoomUserDTO>(),
                MaxUsers = roomEntity.MaxUsers,
                IsPublic = !roomEntity.IsPrivate,
                RoomStatus = roomEntity.RoomStatus,
                TournamentId = roomEntity.TournamentId,
                TournamentName = tournament.Name,
                TournamentLeague = tournament.League,
                TournamentStartDate = tournament.StartDate,
                TournamentEndDate = tournament.EndDate,
                IsUserInRoom = true
            };
           
            await _roomsHub.Clients.Group("SignalR Users").SendAsync("RoomCreated", roomDto);

            return roomDto;
        }
        public async Task<List<RoomDTO>> GetRoomsAsync(int? currentUserId = null)
        {

            var rooms = await _unitOfWork.Rooms.GetAllAsync();

            return rooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                EntryFee = r.EntryFee,
                Users = r.Participants.Select(u => new RoomUserDTO
                {
                    Id = u.UserId,
                    UserRoomRole = u.UserRoomRole,
                    //  Name = u.User.Name,//should name be shared in api
                    //  Email = u.User.Email//should email be shared in api
                }).ToList(),
                MaxUsers = r.MaxUsers,
                IsPublic = !r.IsPrivate,
                RoomStatus = r.RoomStatus,
                TournamentId = r.TournamentId,
                TournamentName = r.Tournament?.Name ?? "Unknown Tournament",
                TournamentLeague = r.Tournament?.League ?? "Unknown League",
                TournamentStartDate = r.Tournament?.StartDate ?? DateTime.MinValue,
                TournamentEndDate = r.Tournament?.EndDate ?? DateTime.MinValue,
                CreatedByUserId = r.CreatedBy,
                //  CreatedByUserName = r.CreatedBy?.Name ?? "Unknown User",
                IsUserInRoom = currentUserId.HasValue && IsUserInRoom(r, currentUserId.Value)

            }).ToList();
        }

        public async Task<RoomDTO> GetRoomByIdAsync(int id, int? userId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(id);
            if (room == null)
            {
                throw new Exception("Room not found: " + id);
            }

            return new RoomDTO
            {
                Id = room.Id,
                Name = room.Name,
                Description = room.Description,
                EntryFee = room.EntryFee,
                Users = room.Participants.Select(u => new RoomUserDTO
                {
                    Id = u.UserId,
                    UserRoomRole = u.UserRoomRole,
                }).ToList(),
                MaxUsers = room.MaxUsers,
                IsPublic = !room.IsPrivate,
                RoomStatus = room.RoomStatus,
                TournamentId = room.TournamentId,
                TournamentName = room.Tournament?.Name ?? "Unknown Tournament",
                TournamentLeague = room.Tournament?.League ?? "Unknown League",
                TournamentStartDate = room.Tournament?.StartDate ?? DateTime.MinValue,
                TournamentEndDate = room.Tournament?.EndDate ?? DateTime.MinValue,
                //CreatedByUserName = room.CreatedByUser?.Name ?? "Unknown User",
                IsUserInRoom = userId.HasValue && IsUserInRoom(room, userId.Value)
            };
        }

        public async Task<List<RoomDTO>> GetMyRoomsAsync(int userId)
        {
            var rooms = await _unitOfWork.Rooms.GetAllAsync();

            var myRooms = rooms.Where(r =>
               r.CreatedBy == userId ||
                r.Participants.Any(p => p.Id == userId)
            ).ToList();

            return myRooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                EntryFee = r.EntryFee,
                Users = r.Participants.Select(u => new RoomUserDTO
                {
                    Id = u.UserId,
                    UserRoomRole = u.UserRoomRole,
                }).ToList(),
                MaxUsers = r.MaxUsers,
                IsPublic = !r.IsPrivate,
                RoomStatus = r.RoomStatus,
                TournamentId = r.TournamentId,
                TournamentName = r.Tournament?.Name ?? "Unknown Tournament",
                TournamentLeague = r.Tournament?.League ?? "Unknown League",
                TournamentStartDate = r.Tournament?.StartDate ?? DateTime.MinValue,
                TournamentEndDate = r.Tournament?.EndDate ?? DateTime.MinValue,
                // CreatedByUserName = r.CreatedByUserName ?? "Unknown User",
                IsUserInRoom = true
            }).ToList();
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

            var updatedRoom = await GetRoomByIdAsync(roomId, userId);

            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("RoomUpdated", updatedRoom);

            await _roomsHub.Clients.Group("SignalR Users").SendAsync("RoomUpdated", updatedRoom);

            await _roomsHub.Clients.Group("SignalR Users").SendAsync("UserJoined", new
            {
                roomId = roomId,
                userId = userId,
                userName = user.Name,
                participantsCount = updatedRoom.Users.Count
            });
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

            var updatedRoom = await GetRoomByIdAsync(roomId, userId);

            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("RoomUpdated", updatedRoom);

            await _roomsHub.Clients.Group("SignalR Users").SendAsync("RoomUpdated", updatedRoom);

            await _roomsHub.Clients.Group("SignalR Users").SendAsync("UserLeft", new
            {
                roomId = roomId,
                userId = userId,
                participantsCount = updatedRoom.Users.Count
            });
        }

        private bool IsUserInRoom(RoomEntity room, int userId)
        {
            return room.Participants.Any(p => p.UserId == userId);
        }
    }

    public interface IRoomService
    {
        Task<RoomDTO> CreateRoomAsync(NewRoomDto newRoomDto, int createdByUserId);
        Task<List<RoomDTO>> GetRoomsAsync(int? currentUserId = null);
        Task<RoomDTO> GetRoomByIdAsync(int id, int? userId);
        Task<List<RoomDTO>> GetMyRoomsAsync(int userId);
        Task JoinRoomAsync(int roomId, int userId);
        Task LeaveRoomAsync(int roomId, int userId);
    }
}