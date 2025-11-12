using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;

namespace Predicto.Database.Entities.Room
{
    public class RoomEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TournamentId { get; set; }
        public virtual TournamentEntity Tournament { get; set; }
        public int? EntryFee { get; set; }       
        public int MaxUsers { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CreatedByUserId { get; set; }
        //public  virtual  UserEntity CreatedByUser { get; set; }//todo should be required
        public RoomStatus RoomStatus { get; set; }
        public virtual ICollection<RoomUserEntity> Participants { get; set; } = new List<RoomUserEntity>();
        public int CreatedById { get; set; } // user id of user that created room
        public bool IsPrivate { get; set; } = false;
        public bool IsActive { get; set; } = true;
    }

    public enum RoomStatus
    {
        Waiting,
        InProgress,
        Completed
    }
}