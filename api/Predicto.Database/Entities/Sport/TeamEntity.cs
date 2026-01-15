using Predicto.Database.Entities.Sport.Enums;
using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class TeamEntity : IEntity
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public required string Name { get; set; }
        public required string FullName { get; set; }
        public TeamTypeEnum Type { get; set; } //Club, National
        public string ImageUrl { get; set; } = string.Empty;
        public string? Code { get; set; }//PL, GER
        public string Coach { get; set; } = string.Empty;
        public virtual ICollection<PlayerEntity> Players { get; set; } = new List<PlayerEntity>();
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;

        public string? UefaId { get; set; }
   

    }
}
