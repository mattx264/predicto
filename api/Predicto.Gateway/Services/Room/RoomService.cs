using Microsoft.AspNetCore.SignalR;
using Predicto.Database.Entities;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Hubs;
using Predicto.Gateway.Hubs.Room;

namespace Predicto.Gateway.Services.Room
{
    public class RoomService : IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<RoomsHub> _roomsHub;
        private readonly IHubContext<RoomHub> _roomHub;

        public RoomService(
            IUnitOfWork unitOfWork, 
            IHubContext<RoomsHub> roomsHub,
            IHubContext<RoomHub> roomHub)
        {
            _unitOfWork = unitOfWork;
            _roomsHub = roomsHub;
            _roomHub = roomHub;
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
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = createdByUserId
            };
            
            await _unitOfWork.Rooms.AddAsync(roomEntity);
            await _unitOfWork.CompleteAsync();
            
            var roomDto = new RoomDTO
            {
                Id = roomEntity.Id,
                Name = roomEntity.Name,
                Description = roomEntity.Description,
                EntryFee = roomEntity.EntryFee,
                Users = new List<DTO.User.UserDto>(),
                MaxUsers = roomEntity.MaxUsers,
                IsPublic = !roomEntity.IsPrivate,
                RoomStatus = roomEntity.RoomStatus,
                TournamentId = roomEntity.TournamentId,
                TournamentName = tournament.Name,
                TournamentLeague = tournament.League,
                TournamentStartDate = tournament.StartDate,
                TournamentEndDate = tournament.EndDate,
                CreatedAt = roomEntity.CreatedAt,
                CreatedByUserId = roomEntity.CreatedByUserId,
                CreatedByUserName = user.Name,
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
                Users = r.Participants.Select(u => new DTO.User.UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                }).ToList(),
                MaxUsers = r.MaxUsers,
                IsPublic = !r.IsPrivate,
                RoomStatus = r.RoomStatus,
                TournamentId = r.TournamentId,
                TournamentName = r.Tournament?.Name ?? "Unknown Tournament",
                TournamentLeague = r.Tournament?.League ?? "Unknown League",
                TournamentStartDate = r.Tournament?.StartDate ?? DateTime.MinValue,
                TournamentEndDate = r.Tournament?.EndDate ?? DateTime.MinValue,
                CreatedAt = r.CreatedAt,
                CreatedByUserId = r.CreatedByUserId,
                CreatedByUserName = r.CreatedByUser?.Name ?? "Unknown User",
                IsUserInRoom = currentUserId.HasValue && 
                              (r.CreatedByUserId == currentUserId.Value || 
                               r.Participants.Any(p => p.Id == currentUserId.Value))
            }).ToList();
        }

        public async Task<RoomDTO> GetRoomByIdAsync(int id)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(id);
            if (room == null) return null;

            return new RoomDTO
            {
                Id = room.Id,
                Name = room.Name,
                Description = room.Description,
                EntryFee = room.EntryFee,
                Users = room.Participants.Select(u => new DTO.User.UserDto 
                { 
                    Id = u.Id, 
                    Name = u.Name, 
                    Email = u.Email 
                }).ToList(),
                MaxUsers = room.MaxUsers,
                IsPublic = !room.IsPrivate,
                RoomStatus = room.RoomStatus,
                TournamentId = room.TournamentId,
                TournamentName = room.Tournament?.Name ?? "Unknown Tournament",
                TournamentLeague = room.Tournament?.League ?? "Unknown League",
                TournamentStartDate = room.Tournament?.StartDate ?? DateTime.MinValue,
                TournamentEndDate = room.Tournament?.EndDate ?? DateTime.MinValue,
                CreatedAt = room.CreatedAt,
                CreatedByUserId = room.CreatedByUserId,
                CreatedByUserName = room.CreatedByUser?.Name ?? "Unknown User",
                IsUserInRoom = false
            };
        }

        public async Task<List<RoomDTO>> GetMyRoomsAsync(int userId)
        {
            var rooms = await _unitOfWork.Rooms.GetAllAsync();

            var myRooms = rooms.Where(r =>
                r.CreatedByUserId == userId ||
                r.Participants.Any(p => p.Id == userId)
            ).ToList();

            return myRooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                EntryFee = r.EntryFee,
                Users = r.Participants.Select(u => new DTO.User.UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                }).ToList(),
                MaxUsers = r.MaxUsers,
                IsPublic = !r.IsPrivate,
                RoomStatus = r.RoomStatus,
                TournamentId = r.TournamentId,
                TournamentName = r.Tournament?.Name ?? "Unknown Tournament",
                TournamentLeague = r.Tournament?.League ?? "Unknown League",
                TournamentStartDate = r.Tournament?.StartDate ?? DateTime.MinValue,
                TournamentEndDate = r.Tournament?.EndDate ?? DateTime.MinValue,
                CreatedAt = r.CreatedAt,
                CreatedByUserId = r.CreatedByUserId,
                CreatedByUserName = r.CreatedByUser?.Name ?? "Unknown User",
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
            
            if (room.Participants.Any(p => p.Id == userId))
            {
                throw new InvalidOperationException("Już jesteś w tym pokoju");
            }
            
            var user = await _unitOfWork.Users.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("Użytkownik nie istnieje");
            }
            
            room.Participants.Add(user);
            await _unitOfWork.CompleteAsync();
            
            
            var updatedRoom = await GetRoomByIdAsync(roomId);
            
            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("RoomUpdated", updatedRoom);
            
            await _roomsHub.Clients.Group("SignalR Users").SendAsync("UserJoined", new 
            { 
                roomId = roomId, 
                userId = userId, 
                userName = user.Name,
                participantsCount = room.Participants.Count
            });
        }

        public async Task LeaveRoomAsync(int roomId, int userId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(roomId);
            
            if (room == null)
            {
                throw new ArgumentException("Pokój nie istnieje");
            }
            
            var participant = room.Participants.FirstOrDefault(p => p.Id == userId);
            if (participant == null)
            {
                throw new InvalidOperationException("Nie jesteś członkiem tego pokoju");
            }
            
            if (room.CreatedByUserId == userId)
            {
                throw new InvalidOperationException("Twórca pokoju nie może go opuścić. Możesz go usunąć.");
            }
            
            room.Participants.Remove(participant);
            await _unitOfWork.CompleteAsync();
            
            var updatedRoom = await GetRoomByIdAsync(roomId);
            await _roomHub.Clients.Group($"Room_{roomId}").SendAsync("RoomUpdated", updatedRoom);
            
            await _roomsHub.Clients.Group("SignalR Users").SendAsync("UserLeft", new 
            { 
                roomId = roomId, 
                userId = userId,
                participantsCount = room.Participants.Count
            });
        }
    }
    
    public interface IRoomService
    {
        Task<RoomDTO> CreateRoomAsync(NewRoomDto newRoomDto, int createdByUserId);
        Task<List<RoomDTO>> GetRoomsAsync(int? currentUserId = null);
        Task<RoomDTO> GetRoomByIdAsync(int id);
        Task<List<RoomDTO>> GetMyRoomsAsync(int userId);
        Task JoinRoomAsync(int roomId, int userId);
        Task LeaveRoomAsync(int roomId, int userId);
    }
}