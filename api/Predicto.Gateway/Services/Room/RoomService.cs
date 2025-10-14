using Microsoft.AspNetCore.SignalR;
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
        private readonly IHubContext<RoomsHub> _roomHub;

        public RoomService(IUnitOfWork unitOfWork, IHubContext<RoomsHub> roomHub)
        {
            _unitOfWork = unitOfWork;
            _roomHub = roomHub;
        }



        public async Task CreateRoomAsync(NewRoomDto newRoomDto)
        {
            var roomEntity = new Database.Entities.RoomEntity { Name = newRoomDto.Name, Description = newRoomDto.Description, TournamentId = newRoomDto.TournamentId };
            await _unitOfWork.Rooms.AddAsync(roomEntity);
            await _unitOfWork.CompleteAsync();
            await _roomHub.Clients.All.SendAsync("GetRooms", new List<RoomDTO>(){ new RoomDTO()
            {
                Id = roomEntity.Id,
                Name = roomEntity.Name,
                Description = roomEntity.Description,
                EntryFee = 10,
                Users = new List<DTO.User.UserDto>(),
                MaxUsers = 10,
                IsPublic = true,
                RoomStatus = RoomStatus.Waiting,
                TournamentId = 1,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = 1
            } });
        }
        public async Task<List<RoomDTO>> GetRoomsAsync()
        {
            var rooms = await _unitOfWork.Rooms.GetAllAsync();
            return rooms.Select(r => new RoomDTO
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                EntryFee = 10,
                Users = new List<DTO.User.UserDto>(),
                MaxUsers = 10,
                IsPublic = true,
                RoomStatus = RoomStatus.Waiting,
                TournamentId = r.TournamentId,
             
            }).ToList();
        }
    }
    public interface IRoomService
    {
        public Task CreateRoomAsync(NewRoomDto newRoomDto);
        public Task<List<RoomDTO>> GetRoomsAsync();
    }
}
