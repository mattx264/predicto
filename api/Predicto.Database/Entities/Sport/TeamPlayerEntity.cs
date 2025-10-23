using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Database.Entities.Sport
{
    public class TeamPlayerEntity : IEntity
    {
        public int Id { get; set; }
        public int TeamEntityId { get; set; }
        public virtual TeamEntity TeamEntity { get; set; }

        public int PlayerEntityId { get; set; }
        public virtual PlayerEntity PlayerEntity { get; set; }
        public bool IsActive { get; set; }
    }
}
