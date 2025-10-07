using Microsoft.AspNetCore.SignalR;
using Predicto.Gateway.DTO.Rooms;

namespace Predicto.Gateway.Hubs
{
    public class RoomsHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var id = Context?.GetHttpContext()?.GetRouteValue("group") as string;

            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("GetRooms",new List<RoomDTO>(){ new RoomDTO()
            {
                Id = 1,
                Name = "Sample Room",
                Description = "This is a sample room",
                EntryFee = 10,
                Users = new List<DTO.User.UserDto>(),
                MaxUsers = 10,
                IsPublic = true,
                RoomStatus = RoomStatus.Waiting,
                TournamentId = 1,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = 1
            },new RoomDTO()
            {
                Id = 2,
                Name = "Sample Room22222",
                Description = "This is a sample room",
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
        
    }
}
