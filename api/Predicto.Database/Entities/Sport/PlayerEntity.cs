using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public required string? BirthCountry { get; set; }
        public required string? Nationality { get; set; }
        public required int? Height { get; set; }
        public required int? Weight { get; set; }
        public int? ShirtNumber { get; set; }
        public string? Position { get; set; } //Goalkeeper, Defender, Midfielder, Forward
        public string? PhotoUrl { get; set; }
        public int? MarketValue { get; set; }
        public string? Bio { get; set; }
        public virtual ICollection<TeamEntity> Teams { get; set; }
        public bool IsActive { get; set; }


    }
}
