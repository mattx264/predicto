using Predicto.Database.Entities.Sport.Enums;
using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class GameScoreEntity : IEntity
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public virtual GameEntity Game { get; set; }= null!;
        public int TeamId { get; set; }
        //public virtual TeamEntity Team { get; set; }= null!;
        public int PlayerId { get; set; }
        public string TimeScored { get; set; }
        //public virtual PlayerEntity Player { get; set; } = null!;
        //public int Score { get; set; }
        // public int ScoreTeamOne { get; set; }
        //  public int ScoreTeamTwo { get; set; }
        //  public required TimeScoreEnum TimeScored { get; set; } //FullTime, HalfTime, ExtraTime, Penalty
        public string? Phase { get; set; }//"FIRST_HALF" | "SECOND_HALF"
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
