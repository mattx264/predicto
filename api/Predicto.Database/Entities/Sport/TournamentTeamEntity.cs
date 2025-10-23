using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Database.Entities.Sport
{
    public class TournamentTeamEntity : IEntity
    {
        public int Id { get; set; }
        public int TeamEntityId { get; set; }
        public virtual required TeamEntity TeamEntity { get; set; }

        public int TournamentEntityId { get; set; }
        public virtual required TournamentEntity TournamentEntity { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
