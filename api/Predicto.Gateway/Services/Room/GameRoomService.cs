using FluentEmail.Core;
using Predicto.Database.Entities;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Room;

namespace Predicto.Gateway.Services.Room
{
    public class GameRoomService : IGameRoomService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GameRoomService(IUnitOfWork unitOfWork, IRoomService roomService)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task BetGame(RoomGameBetDto roomGameBets, int userId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(roomGameBets.RoomId);
            if (room == null)
            {
                throw new Exception("Room not exists: " + roomGameBets.RoomId);
            }
            var userRoom = room.Participants.FirstOrDefault(x => x.UserId == userId);
            if (userRoom == null || userRoom.RoomUserBets == null)
            {
                throw new UnauthorizedAccessException();
            }

            foreach (var item in roomGameBets.RoomGameBetTeam)
            {
                userRoom.RoomUserBets.Add(
               new RoomUserBetEntity()
               {

                   GameId = roomGameBets.GameId,
                   TeamId = item.TeamId,
                   Bet = item.Bet,
               });
            }
            await _unitOfWork.CompleteAsync();

        }

        public async Task<List<RoomGameDto>> GetGames(int roomId, int userId)
        {

            var room = await _unitOfWork.Rooms.GetByIdAsync(roomId);
            if (room == null)
            {
                throw new Exception("Room not exists: " + roomId);
            }
            var userRoom = room.Participants.FirstOrDefault(x => x.UserId == userId);
            var userBets = userRoom?.RoomUserBets?.ToList();

            if (userRoom == null)
            {
                throw new UnauthorizedAccessException();
            }
            var games = await _unitOfWork.Game.WhereAsync(x => x.TournamentId == room.TournamentId);
            var teams = await _unitOfWork.Team.GetAllAsync();
            var roomGame = games.Select(x => new RoomGameDto()
            {

                RoomId = roomId,
                GameId = x.Id,
                Teams = x.Teams.Select(t => new TeamUserBetDto(t.Team)).ToList()

            }).ToList();

            foreach (var bet in userBets)
            {
                var rg = roomGame.FirstOrDefault(x => x.GameId == bet.GameId);
                if (rg == null)
                {
                    continue;
                }
                var tu = rg.Teams.FirstOrDefault(t => t.Id == bet.TeamId);
                if (tu == null)
                {
                    continue;
                }
                tu.Bet = bet.Bet;


            }

            return roomGame;
        }
    }
    public interface IGameRoomService
    {
        Task BetGame(RoomGameBetDto roomGameBets, int userId);
        Task<List<RoomGameDto>> GetGames(int roomId, int userId);
    }

}
