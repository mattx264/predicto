using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class PlayerEntity : IEntity
    {
        public int Id { get; set; }
        public int? FootballApiId { get; set; }
        public int? FifaId { get; set; }
        public int? UefaId { get; set; }
        public string Slug { get; set; }
        public required string Name { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int? Age { get; set; }
        public DateOnly? Birthday { get; set; }
        public string? BirthPlace { get; set; }
        public  string? BirthCountry { get; set; }
        public  string? Nationality { get; set; }
        public  int? Height { get; set; }
        public  int? Weight { get; set; }
        public int? ShirtNumber { get; set; }
        public string? Position { get; set; } //Goalkeeper, Defender, Midfielder, Forward
        public string? PhotoUrl { get; set; }
        public int? MarketValue { get; set; }
        public string? Bio { get; set; }
        public virtual ICollection<TeamEntity> Teams { get; set; }
        public bool IsActive { get; set; }
        public DateTime LastModified { get; set; }


    }
}
