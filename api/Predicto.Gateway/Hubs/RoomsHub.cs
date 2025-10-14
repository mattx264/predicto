using Microsoft.AspNetCore.SignalR;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Hubs
{
    public class RoomsHub : Hub
    {
        private readonly IRoomService _roomService;

        public RoomsHub(IRoomService roomService)
        {
            _roomService = roomService;
        }
        public override async Task OnConnectedAsync()
        {
            var id = Context?.GetHttpContext()?.GetRouteValue("group") as string;

            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
            var rooms = await _roomService.GetRoomsAsync();
            await Clients.Caller.SendAsync("GetRooms", rooms);
        }




    }
}
