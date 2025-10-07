﻿using Predicto.Gateway.DTO.User;

namespace Predicto.Gateway.DTO.Rooms
{
    public class RoomDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int EntryFee { get; set; }
        public IList<UserDto> Users { get; set; }
        public int? MaxUsers { get; set; }
        public bool IsPublic { get; set; }
        public RoomStatus RoomStatus { get; set; }
        public int TournamentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedByUserId { get; set; }
    }
public enum RoomStatus { 
    Waiting,
    InProgress,
    Completed
}
}
