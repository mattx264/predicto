using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class GamePlayerEntity : IEntity
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public virtual GameEntity? Game { get; set; }
        public int PlayerId { get; set; }
        public virtual PlayerEntity? Player { get; set; }
        public int Position { get; set; } // e.g., Forward, Midfielder, Defender, Goalkeeper, Coach
        public bool IsCaptain { get; set; }
        //public int ReplaceByPlayerId { get; set; } // Player who replaced this player, if any
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
