using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces;
using System;
using System.Collections.Generic;

namespace Predicto.Database.Entities.Room
{
    public class RoomEntity:IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TournamentId { get; set; }
        public virtual TournamentEntity Tournament { get; set; }
        public int? EntryFee { get; set; }       
        public int MaxUsers { get; set; }
        public RoomStatus RoomStatus { get; set; }
        public virtual ICollection<RoomUserEntity> Participants { get; set; } = new List<RoomUserEntity>();
        public int CreatedById { get; set; } // user id of user that created room
        public bool IsPrivate { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
    }

    public enum RoomStatus
    {
        Waiting,
        InProgress,
        Completed
    }
}