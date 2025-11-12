using Predicto.Database.Entities.Room;
using Predicto.Database.Entities.Sport;

namespace Predicto.Database.Entities
{
    public class RoomUserBetEntity
    {
        public int Id { get; set; }
        //public int RoomUserId { get; set; }
        //public virtual RoomUserEntity RoomUser { get; set; }
        public int TeamId { get; set; }
        public virtual TeamEntity Team { get; set; }
        public int GameId { get; set; }
        public virtual GameEntity Game { get; set; }
        public required string Bet { get; set; }
        public BetTypeEnum BetType { get; set; }
    }

    public enum BetTypeEnum
    {
        WinnerSide = 1,
        PointSide = 2,

    }
}