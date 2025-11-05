using Predicto.Database.Entities.Sport;

namespace Predicto.Database.Entities.Sport.ExternalSource
{
    public class TeamExternalEntity
    {
        public int TeamId { get; set; }
        public TeamEntity Team { get; set; }
        public ExternalSource Source { get; set; }
    }
}
