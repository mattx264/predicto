using Predicto.Database.Interfaces;

namespace Predicto.Database.Entities.Sport
{
    public class GameGroupTeamEntity : IEntity
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public virtual TeamEntity Team { get; set; }
        public int Won { get; set; }
        public int Lost { get; set; }
        public int Drawn { get; set; }
        public int Played { get; set; }
        public int Points { get; set; }
        public int GoalsDiference { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; }

    }
}
