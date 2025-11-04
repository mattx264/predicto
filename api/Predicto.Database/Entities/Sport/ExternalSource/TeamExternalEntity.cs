using Predicto.Gateway.DTO.Sport;

namespace Predicto.Database.Entities.Sport.ExternalSource
{
    public class TeamExternalEntity
    {
        public int TeamId { get; set; }
        public TeamEntity Team { get; set; }
        public ExternalSource Source { get; set; }
    }
}
