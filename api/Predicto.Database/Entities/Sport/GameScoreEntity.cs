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
        public required TimeScore TimeScore { get; set; } //FullTime, HalfTime, ExtraTime, Penalty
        public bool IsActive { get; set; } = true;
    }
}
