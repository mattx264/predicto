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
            foreach (var item in userRoom.RoomUserBets.Where(x => x.GameId == roomGameBets.GameId))
            {
                item.IsActive = false;
            }
            foreach (var item in roomGameBets.RoomGameBetTeam)
            {
                var isWinnerSide = item.Bet == "W" || item.Bet == "D" || item.Bet == "L";
                userRoom.RoomUserBets.Add(
               new RoomUserBetEntity()
               {

                   GameId = roomGameBets.GameId,
                   TeamId = item.TeamId,
                   Bet = item.Bet,
                   BetType = isWinnerSide ? BetTypeEnum.WinnerSide : BetTypeEnum.PointSide,
                   IsActive = true
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
        public async Task<List<OtherGameBetSimpleDto>> GetOtherBet(int roomId, int gameId, int userId)
        {
            var room = await _unitOfWork.Rooms.GetByIdAsync(roomId);
            if (room == null)
            {
                throw new Exception("Room not exists: " + roomId);
            }
            var userRoom = room.Participants.FirstOrDefault(x => x.UserId == userId);
            userRoom.RoomUserBets?.ToList();
            if (userRoom == null)
            {
                throw new UnauthorizedAccessException();
            }
            var participants = room.Participants.ToList();
            var otherGameBetSimpleDto = (await _unitOfWork.Game.GetByIdAsync(gameId))?.Teams.Select(x => new OtherGameBetSimpleDto()
            {
                TeamId = x.TeamId
            }).ToList();
            if (otherGameBetSimpleDto == null)
            {
                throw new Exception("Teams not found");
            }
            var betList = new List<RoomUserBetEntity>() { };

            var totalCount = 0;
            foreach (var item in participants)
            {

                var roomUserBet = item.RoomUserBets.Where(x => x.GameId == gameId && x.IsActive).ToList();
                var first = roomUserBet.FirstOrDefault();

                if (first == null)
                {
                    continue;
                }
                var otherBet = otherGameBetSimpleDto.First(x => x.TeamId == first.TeamId);
                if (first.BetType == BetTypeEnum.WinnerSide)
                {

                    if (first.Bet == "W")
                    {
                        otherBet.Win += 1;
                        totalCount++;

                    }
                    else if (first.Bet == "D")
                    {
                        otherBet.Draw += 1;
                        totalCount++;
                    }
                }
                if (first.BetType == BetTypeEnum.PointSide)
                {
                    var second = roomUserBet.LastOrDefault();
                    if (int.Parse(first.Bet) > int.Parse(second.Bet))
                    {
                        otherBet.Win += 1;
                        totalCount++;
                    }
                    else if (int.Parse(first.Bet) == int.Parse(second.Bet))
                    {
                        otherBet.Draw += 1;
                        totalCount++;
                    }
                    else
                    {
                        var otherBetSecond = otherGameBetSimpleDto.First(x => x.TeamId == second.TeamId);

                        otherBetSecond.Win += 1;
                        totalCount++;
                    }


                }
            }
            foreach (var item in otherGameBetSimpleDto)
            {
                item.TotalCount = totalCount;
            }
            return otherGameBetSimpleDto;

        }
    }
    public interface IGameRoomService
    {
        Task BetGame(RoomGameBetDto roomGameBets, int userId);
        Task<List<RoomGameDto>> GetGames(int roomId, int userId);
        Task<List<OtherGameBetSimpleDto>> GetOtherBet(int roomId, int gameId, int userId);
    }

}
