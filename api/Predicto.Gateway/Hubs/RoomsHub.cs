using Microsoft.AspNetCore.SignalR;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Services.Room;
using System.Security.Claims;

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
            
          
            
            int? currentUserId = null;
            if (Context.User?.Identity?.IsAuthenticated == true)
            {
                var userIdClaim = Context.User.FindFirst(ClaimTypes.NameIdentifier)
                               ?? Context.User.FindFirst("sub");
                
                if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                {
                    currentUserId = userId;
                }
                else
                {
                 
                    foreach (var claim in Context.User.Claims)
                    {
                        Console.WriteLine($"  {claim.Type}: {claim.Value}");
                    }
                }
            }
            else
            {
                Console.WriteLine($" User not authenticated in SignalR");
            }
            
            Console.WriteLine($"Fetching rooms with userId: {currentUserId}");
            
            var rooms = await _roomService.GetRoomsAsync(currentUserId);
            await Clients.Caller.SendAsync("GetRooms", rooms);
        }

        /// <summary>
        /// Broadcast że użytkownik dołączył do pokoju
        /// </summary>
        public async Task NotifyUserJoined(int roomId, int userId, string userName, int participantsCount)
        {
            await Clients.Group("SignalR Users").SendAsync("UserJoined", new
            {
                roomId,
                userId,
                userName,
                participantsCount
            });
        }

        /// <summary>
        /// Broadcast że użytkownik opuścił pokój
        /// </summary>
        public async Task NotifyUserLeft(int roomId, int userId, int participantsCount)
        {
            await Clients.Group("SignalR Users").SendAsync("UserLeft", new
            {
                roomId,
                userId,
                participantsCount
            });
        }

        /// <summary>
        /// Broadcast że utworzono nowy pokój
        /// </summary>
        public async Task NotifyRoomCreated(RoomDTO room)
        {
            await Clients.Group("SignalR Users").SendAsync("RoomCreated", room);
        }
    }
}