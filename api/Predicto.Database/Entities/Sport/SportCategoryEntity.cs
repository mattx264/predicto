using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class SportCategoryEntity : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //Soccer, Basketball, Tennis, Baseball, AmericanFootball, IceHockey, Rugby, Cricket
    }
}
