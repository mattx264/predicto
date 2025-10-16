using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities
{
    public class RoomEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TournamentId { get; set; }
        public virtual TournamentEntity Tournament { get; set; }
        public bool IsActive { get; set; } = true;


    }
}
