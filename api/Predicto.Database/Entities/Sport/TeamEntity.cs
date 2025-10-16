using Predicto.Database.Interfaces;

namespace Predicto.Gateway.DTO.Sport
{
    public class TeamEntity : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public bool IsActive { get; set; } = true;

    }
}
