using Microsoft.AspNetCore.SignalR;
using Predicto.Database.Interfaces;
using Predicto.Database.UnitOfWork;
using Predicto.Gateway.Hubs;
using Predicto.Gateway.Hubs.Room;
using Predicto.Gateway.Middleware.Redis;
using System.Threading.Tasks;

namespace Predicto.Gateway.Services.DataImporter
{
    public class GameDataImporterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheService _cache;
        private readonly IHubContext<RoomHub> _roomHub;

        public GameDataImporterService(IUnitOfWork unitOfWork, ICacheService cache,
            IHubContext<RoomHub> roomHub)
        {
            _unitOfWork = unitOfWork;
            _cache = cache;
            _roomHub = roomHub;
        }
        public async void GameStart()
        {
            //send info to show red dot in rooms
        }
        public async void EndStart()
        {
            //finalize game in rooms
        }
        public async Task NewGool(int gameId, int teamId)
        {
            var game = await _unitOfWork.Game.GetByIdAsync(gameId);
            if (game == null)
            {
                throw new Exception("Game not found id: " + gameId);
            }
            ICollection<Database.Entities.Sport.GameTeamEntity> teams = game.Teams;
            if (teams.Count < 2)
            {
                throw new Exception("Game teams not found id: " + gameId);
            }
            bool isHomeTeam = teams.First().TeamId == teamId;
            var score = game.FinalScore;
            if (string.IsNullOrEmpty(score))
            {
                score = "0:0";
            }
            if (isHomeTeam)
            {
                score = $"{int.Parse(score.Split(':')[0]) + 1}:{score.Split(':')[1]}";
            }
            else
            {
                score = $"{score.Split(':')[0]}:{int.Parse(score.Split(':')[1]) + 1}";
            }
            game.FinalScore = score;
            _unitOfWork.Game.Update(game, 1);//update by system
            await _unitOfWork.CompleteAsync();

            //get all rooms where game is being played
            var rooms = await _unitOfWork.Rooms.GetRoomsByGameId(gameId);

            foreach (var room in rooms)
            {
                var gameUpdate = new
                {
                    GameId = gameId,
                    Score = score
                };
                await _roomHub.Clients.Group($"Room_{room.Id}").SendAsync("GameUpdate_Gool", gameUpdate);

            }

        }

    }
}
