using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;
using System.ComponentModel.DataAnnotations.Schema;

namespace Predicto.Database.Entities.Sport
{
    public class GameEntity : IEntity
    {
        public int Id { get; set; }
        public int TournamentId { get; set; }
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
        public virtual GameTeamEntity HomeTeam { get; set; }
        public virtual GameTeamEntity AwayTeam { get; set; }

        public required string? FinalScore { get; set; }// 1:1 (4:5) //
        public DateTime StartGame { get; set; }
        public virtual TournamentEntity? Tournament { get; set; }

        public bool IsActive { get; set; } = true;

        public string? Referee { get; set; }
        //public string? PlayerData { get; set; }
        public string? StadiumName { get; set; }
        public string? StadiumNameCityName { get; set; }

        public virtual ICollection<GamePlayerEntity> GamePlayers { get; set; }
        public virtual ICollection<GamePlayerEventEntity> GamePlayerEvents { get; set; }
        public virtual ICollection<GameScoreEntity> GameScoreEvents { get; set; }



    }
}
