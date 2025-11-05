using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class TeamEntity : IEntity
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public required string Name { get; set; }
        public TeamTypeEnum Type { get; set; } //Club, National
        public int? FootballApiId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Code { get; set; }//PL, GER
        public string Coach { get; set; } = string.Empty;
        public string FormLastGames { get; set; } = string.Empty;// WWDLD
        public virtual ICollection<PlayerEntity> Players { get; set; }// = new List<PlayerEntity>();

        public bool IsActive { get; set; } = true;

    }
}
