using Predicto.Database.Entities;
using Predicto.Gateway.DTO.User;

namespace Predicto.Gateway.DTO.Rooms
{
    public class RoomDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? EntryFee { get; set; }
        public IList<UserDto> Users { get; set; }
        public int? MaxUsers { get; set; }
        public bool IsPublic { get; set; }
        public RoomStatus RoomStatus { get; set; }
        public int TournamentId { get; set; }
        
        public string TournamentName { get; set; }
        public string TournamentLeague { get; set; }
        public DateTime TournamentStartDate { get; set; }
        public DateTime TournamentEndDate { get; set; }
        
        public DateTime CreatedAt { get; set; }
        public int CreatedByUserId { get; set; }
        public string CreatedByUserName { get; set; }
        
        public bool IsUserInRoom { get; set; } 
    }
}