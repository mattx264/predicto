using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces;
using System;
using System.Collections.Generic;

namespace Predicto.Database.Entities.Room
{
    public class RoomUserEntity : IEntity
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public virtual RoomEntity? Room { get; set; }
        public int UserId { get; set; }
        public virtual UserEntity? User { get; set; }
        public virtual UserRoomRole UserRoomRole { get; set; }      
        public virtual ICollection<RoomUserBetEntity>? RoomUserBets { get; set; }

        public bool IsActive { get; set; }
    }


}
public enum UserRoomRole
{
    Participant = 1,
    Admin = 2,
    Moderator = 3
}