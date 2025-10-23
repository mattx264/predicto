using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces;

namespace Predicto.Gateway.DTO.Sport
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
        public bool IsActive { get; set; } = true;

    }
}
