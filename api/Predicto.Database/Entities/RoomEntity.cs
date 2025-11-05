using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;

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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CreatedByUserId { get; set; }
        public virtual UserEntity CreatedByUser { get; set; }
        public RoomStatus RoomStatus { get; set; }
<<<<<<< HEAD
        
        public virtual ICollection<UserEntity> Participants { get; set; } = new List<UserEntity>();
=======
        public int CreatedById { get; set; } // user id of user that created room
>>>>>>> 8c23d5ac1ddca0aa8a29598e28e392360c8a46b8
    }
    
    public enum RoomStatus
    {
        Waiting,
        InProgress,
        Completed
    }
}