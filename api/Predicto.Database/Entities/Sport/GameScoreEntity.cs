using Predicto.Database.Entities.Sport.Enums;
using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class GameScoreEntity : IEntity
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public virtual required GameEntity Game { get; set; }
        public int ScoreTeamOne { get; set; }
        public int ScoreTeamTwo { get; set; }
        public required TimeScoreEnum TimeScore { get; set; } //FullTime, HalfTime, ExtraTime, Penalty
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
