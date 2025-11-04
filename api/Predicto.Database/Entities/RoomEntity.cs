using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities
{
    public class RoomEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TournamentId { get; set; }
        public virtual TournamentEntity Tournament { get; set; }
        public int? EntryFee { get; set; }
        public bool IsPrivate { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public int MaxUsers { get; set; }
        public RoomStatus RoomStatus { get; set; }
        public int CreatedById { get; set; } // user id of user that created room
    }
    public enum RoomStatus
    {
        Waiting,
        InProgress,
        Completed
    }
}
