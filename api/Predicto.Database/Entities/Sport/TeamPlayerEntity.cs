using Predicto.Database.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Predicto.Database.Entities.Sport
{
    public class TeamPlayerEntity : IEntity
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        [ForeignKey("TeamId")]
        public virtual TeamEntity TeamEntity { get; set; }

        public int PlayerId { get; set; }
        [ForeignKey("PlayerId")]
        public virtual PlayerEntity PlayerEntity { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
