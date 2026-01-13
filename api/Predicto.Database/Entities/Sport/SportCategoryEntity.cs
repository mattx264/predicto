using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class SportCategoryEntity : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;

        //Soccer, Basketball, Tennis, Baseball, AmericanFootball, IceHockey, Rugby, Cricket
    }
}
