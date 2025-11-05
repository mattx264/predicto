using Predicto.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Sport
{
    public class GameGroupEntity : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public virtual ICollection<GameGroupTeamEntity> GameGroupTeam { get;set;}
        public bool IsActive { get; set; }
    }
}
