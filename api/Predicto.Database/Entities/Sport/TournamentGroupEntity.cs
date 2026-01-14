using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class TournamentGroupEntity : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public virtual ICollection<TeamEntity> Teams { get; set; } = new SortedSet<TeamEntity>();
        public virtual required TournamentEntity Tournament { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
