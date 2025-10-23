using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Database.Entities.Sport
{
    public class GameEntity : IEntity
    {
        public int Id { get; set; }
        public int TournamentId { get; set; }
        public int TeamIdOne { get; set; }
        public int TeamIdTwo { get; set; }
        public required string FinalScore { get; set; }// 1:1 (4:5) //
        public DateTime StartGame { get; set; }
        public DateTime? EndGame { get; set; }
        public virtual TournamentEntity? Tournament { get; set; }
        public virtual TeamEntity? TeamOne { get; set; }
        public virtual TeamEntity? TeamTwo { get; set; }
        public bool IsActive { get; set; } = true;

        public string? Referee { get; set; }

    }
}
