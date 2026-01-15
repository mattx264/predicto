using Predicto.Database.Interfaces;
using Predicto.Database.Entities.Sport;
using System.ComponentModel.DataAnnotations.Schema;

namespace Predicto.Database.Entities.Sport
{
    public class GameEntity : IEntity
    {
        public int Id { get; set; }
        public int TournamentId { get; set; }
        public virtual TournamentEntity? Tournament { get; set; }
        public virtual ICollection<GameTeamEntity> Teams { get; set; }//Home and Away teams
        public string? FinalScore { get; set; }// 1:1 (4:5) //
        public DateTime StartGame { get; set; }      
        public string? Referee { get; set; }
        public virtual ICollection<GamePlayerEntity>? GamePlayers { get; set; }
        public virtual ICollection<GamePlayerEventEntity>? GamePlayerEvents { get; set; }
        public virtual ICollection<GameScoreEntity>? GameScoreEvents { get; set; }
        public virtual GameStadiumEntity? Stadium { get; set; }
        public int? StadiumId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;

        public string? UefaId { get; set; }

    }
}
