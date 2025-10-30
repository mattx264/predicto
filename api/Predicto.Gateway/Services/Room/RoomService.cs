using Microsoft.AspNetCore.SignalR;
using Predicto.Database.Entities;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Room;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Hubs;

namespace Predicto.Gateway.Services.Room
{
    public class RoomService : IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHubContext<RoomsHub> _roomHub;

        public RoomService(IUnitOfWork unitOfWork, IHubContext<RoomsHub> roomHub)
        {
            _unitOfWork = unitOfWork;
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
                IsActive = true
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
                TournamentId = roomEntity.TournamentId
            };
            
            await _roomHub.Clients.Group("SignalR Users").SendAsync("RoomCreated", roomDto);
            
            return roomDto;
        }

        public async Task<List<RoomDTO>> GetRoomsAsync()
        {
            var rooms = await _unitOfWork.Rooms.GetAllAsync();
            
            return rooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                EntryFee = r.EntryFee,
                Users = new List<DTO.User.UserDto>(),
                MaxUsers = r.MaxUsers,
                IsPublic = !r.IsPrivate,
                RoomStatus = r.RoomStatus,
                TournamentId = r.TournamentId
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
                Users = new List<DTO.User.UserDto>(),
                MaxUsers = room.MaxUsers,
                IsPublic = !room.IsPrivate,
                RoomStatus = room.RoomStatus,
                TournamentId = room.TournamentId
            };
        }
    }
    
    public interface IRoomService
    {
        Task<RoomDTO> CreateRoomAsync(NewRoomDto newRoomDto, int createdByUserId);
        Task<List<RoomDTO>> GetRoomsAsync();
        Task<RoomDTO> GetRoomByIdAsync(int id);
    }
}