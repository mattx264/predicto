using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Sport.ExternalSource
{
    public class PlayerExternalEntity
    {
        public int PlayerId { get; set; }
        public PlayerEntity Player { get; set; }
        public ExternalSource Source { get; set; }
    }
   
}
