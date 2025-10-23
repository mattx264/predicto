using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Sport
{
    public class TournamentGroupEntity : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public virtual ICollection<TeamEntity> Teams { get; set; } = new SortedSet<TeamEntity>();
        public virtual required TournamentEntity Tournament { get; set; }
        public bool IsActive { get ; set ; }
    }
}
