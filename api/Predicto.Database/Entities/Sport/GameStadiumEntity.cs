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
        public bool IsActive { get; set; }
    }
}
