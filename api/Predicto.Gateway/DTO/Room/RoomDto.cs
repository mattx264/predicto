using Predicto.Database.Entities.Room;
using Predicto.Gateway.DTO.User;
using System.Text.Json.Serialization;

namespace Predicto.Gateway.DTO.Rooms
{
    public class RoomDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; } = "";
        public int? EntryFee { get; set; }
        public IList<RoomUserDTO> Users { get; set; } = new List<RoomUserDTO>();
        public int? MaxUsers { get; set; }
        public bool IsPublic { get; set; }
        public RoomStatus RoomStatus { get; set; }
        public int TournamentId { get; set; }

        public required string TournamentName { get; set; }
        public string? TournamentLeague { get; set; }
        public DateTime TournamentStartDate { get; set; }
        public DateTime TournamentEndDate { get; set; }

        public DateTime CreatedAt { get; set; }
        public int CreatedByUserId { get; set; }

        public bool IsUserInRoom { get; set; }
    }
    public class RoomUserDTO
    {
        public int Id { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserRoomRole UserRoomRole { get; set; }

    }
    public class RoomUserDetailsDTO : RoomUserDTO
    {
        public required string Username { get; set; }
        public int Points { get; set; }
        public int Hit { get; set; }//trafienie
    }
}