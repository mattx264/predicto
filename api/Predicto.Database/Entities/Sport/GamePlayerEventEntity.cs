using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Sport
{
    public class GamePlayerEventEntity
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public virtual GameEntity Game { get; set; }
        public int PlayerId { get; set; }
        public virtual PlayerEntity Player { get; set; }
        public int Minute { get; set; }
        public GamePlayerEvent GamePlayerEvent { get; set; }
    }
    public enum GamePlayerEvent
    {
        Goal=1,
        Assist=2,
        YellowCard=3,
        RedCard=4,
        SubstitutionIn=5,
        SubstitutionOut=6,
        OwnGoal=7,
        PenaltyMissed=8
    }
}
