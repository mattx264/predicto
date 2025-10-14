using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class TournamentEntity : IEntity
    {
        //Football World Cup, UEFA Champions League, NBA Finals, Wimbledon, Super Bowl, World Series, Stanley Cup, Rugby World Cup, ICC Cricket World Cup
        public int Id { get; set; }
        public int SportCategoryId { get; set; }
        public virtual SportCategoryEntity SportCategory { get; set; }
        public string Name { get; set; }


    }
}
