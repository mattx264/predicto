using Microsoft.AspNetCore.SignalR;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Hubs.Room
{
    public class RoomHub : Hub
    {
        private readonly IRoomService _roomService;
        private readonly ILogger<RoomHub> _logger;

        public RoomHub(IRoomService roomService, ILogger<RoomHub> logger)
        {
            _roomService = roomService;
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            var roomid = Context?.GetHttpContext()?.GetRouteValue("roomid") as string;
            
            if (string.IsNullOrEmpty(roomid) || !int.TryParse(roomid, out int roomId))
            {
                _logger.LogError("❌ Invalid Room ID: {RoomId}", roomid);
                throw new Exception("Invalid Room ID");
            }

            _logger.LogInformation("🔌 User connected to room {RoomId}, ConnectionId: {ConnectionId}", 
                roomId, Context.ConnectionId);
            
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Room_{roomId}");
            _logger.LogInformation("✅ Added user to group Room_{RoomId}", roomId);
            
            await base.OnConnectedAsync();
            
            try
            {
                var room = await _roomService.GetRoomByIdAsync(roomId);
                
                if (room != null)
                {
                    _logger.LogInformation("📤 Sending initial room data to ConnectionId: {ConnectionId}, Participants: {Count}", 
                        Context.ConnectionId, room.Users?.Count ?? 0);
                    
                    await Clients.Caller.SendAsync("GetRoom", room);
                }
                else
                {
                    _logger.LogWarning("❌ Room {RoomId} not found", roomId);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error fetching room {RoomId}: {Message}", roomId, ex.Message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _logger.LogInformation("🔌 User disconnected, ConnectionId: {ConnectionId}", Context.ConnectionId);
            
            if (exception != null)
            {
                _logger.LogError(exception, "❌ Disconnection error: {Message}", exception.Message);
            }
            
            await base.OnDisconnectedAsync(exception);
        }
    }
}