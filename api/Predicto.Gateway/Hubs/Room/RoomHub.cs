using Microsoft.AspNetCore.SignalR;
using Predicto.Gateway.DTO.Rooms;
using Predicto.Gateway.Services;
using Predicto.Gateway.Services.Room;

namespace Predicto.Gateway.Hubs.Room
{
    public class RoomHub : Hub
    {
        private readonly IRoomService _roomService;
        private readonly IGameService _gameService;
        private readonly IGameRoomService _gameRoomService;
        private readonly ILogger<RoomHub> _logger;

        public RoomHub(IRoomService roomService, IGameService gameService, IGameRoomService gameRoomService, ILogger<RoomHub> logger)
        {
            _roomService = roomService;
            _gameService = gameService;
            _gameRoomService = gameRoomService;
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.User?.Identity?.IsAuthenticated == false)
            {
                throw new UnauthorizedAccessException("User is not authenticated");
            }
            var httpContext = Context?.GetHttpContext();
            var roomid = httpContext?.GetRouteValue("roomid") as string;

            if (string.IsNullOrEmpty(roomid) || !int.TryParse(roomid, out int roomId))
            {
                _logger.LogError("❌ Invalid Room ID: {RoomId}", roomid);
                throw new Exception("Invalid Room ID");
            }

            var connectionId = Context?.ConnectionId;
            if (string.IsNullOrEmpty(connectionId))
            {
                _logger.LogError("❌ ConnectionId is null or empty");
                throw new Exception("ConnectionId is null or empty");
            }

            _logger.LogInformation("🔌 User connected to room {RoomId}, ConnectionId: {ConnectionId}",
                roomId, connectionId);

            await Groups.AddToGroupAsync(connectionId, $"Room_{roomId}");
            _logger.LogInformation("✅ Added user to group Room_{RoomId}", roomId);

            await base.OnConnectedAsync();

            try
            {
                //var userIdentifier = Context?.UserIdentifier;
                //if (string.IsNullOrEmpty(userIdentifier) || !int.TryParse(userIdentifier, out var userId))
                //{
                //    _logger.LogError("❌ Invalid or missing UserIdentifier: {UserIdentifier}", userIdentifier);
                //    throw new Exception("Invalid or missing UserIdentifier");
                //}

                //var room = await _roomService.GetRoomByIdAsync(roomId);

                //if (room != null)
                //{
                //    _logger.LogInformation("📤 Sending initial room data to ConnectionId: {ConnectionId}, Participants: {Count}",
                //        connectionId, room.Users?.Count ?? 0);

                //    await Clients.Caller.SendAsync("GetRoom", room);

                //}
                //else
                //{
                //    _logger.LogWarning("❌ Room {RoomId} not found", roomId);
                //    return;
                //}
                //var userBets =await _gameRoomService.GetGamesBetsAndPoints(room.Id, userId);
                //await Clients.Caller.SendAsync("GetUserBetsAndPoints", userBets);
                //var games = await _gameService.GetAll(room.TournamentId);
                //await Clients.Caller.SendAsync("GetGames", games);


                //await Clients.Caller.SendAsync("GetUserBetsAndPoints", userBets);

                // var userBet= await _roomService.GetUserBetAndPoints(roomId, userId);
                //await Clients.Caller.SendAsync("UserBetAndPoints", room);
                // await Clients.Caller.SendAsync("Games", room);
                // var games = await _roomService.GetGamesInRoomAsync(roomId);
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