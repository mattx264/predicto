using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Sport
{
    public class GamePlayerEntity
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public virtual GameEntity Game { get; set; }
        public int PlayerId { get; set; }
        public virtual PlayerEntity Player { get; set; }
        public int Position { get; set; } // e.g., Forward, Midfielder, Defender, Goalkeeper, Coach
        public bool IsCaptain { get; set; }
        //public int ReplaceByPlayerId { get; set; } // Player who replaced this player, if any

        public bool IsActive { get; set; } = true;
    }
}
