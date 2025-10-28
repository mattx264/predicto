using Microsoft.AspNetCore.SignalR;
using Predicto.Database.Entities;
using Predicto.Gateway.DTO.Rooms;

namespace Predicto.Gateway.Hubs.Room
{
    public class RoomHub :Hub
    {
        public override async Task OnConnectedAsync()
        {
            var roomid = Context?.GetHttpContext()?.GetRouteValue("roomid") as string;
            if(roomid == null)
            {
                throw new Exception("Room ID is null");
            }
                
            await Groups.AddToGroupAsync(Context.ConnectionId, roomid);
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("GetRoom", new RoomDTO()
            {
                Id = int.Parse(roomid),
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

            } );
        }
    }
}
