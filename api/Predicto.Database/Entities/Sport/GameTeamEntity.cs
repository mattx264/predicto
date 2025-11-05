using Predicto.Database.Interfaces;
using Predicto.Database.Entities.Sport;

namespace Predicto.Database.Entities.Sport
{
    public class GameTeamEntity : IEntity
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public int GameId { get; set; }
        public virtual TeamEntity Team { get; set; }
        public virtual GameEntity Game { get; set; }
        public string? Tactics { get; set; }
        public bool IsActive { get; set; }
    }
}
