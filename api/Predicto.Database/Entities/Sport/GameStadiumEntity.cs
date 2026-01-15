using Predicto.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Sport
{
    public class GameStadiumEntity : IEntity
    {
        public int Id { get; set; }
        public required string StadiumName { get; set; }
        public string? StadiumNameCityName { get; set; }
        public string? Address { get; set; }
        public int? Capacity { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; }
		
        public string? UefaId { get; set; }
    }
}
