namespace Predicto.Gateway.DTO.Room
{
    public class NewRoomDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int TournamentId { get; set; }
        public int MaxParticipants { get; set; }
        public int? EntryFee { get; set; }
        public bool IsPrivate { get; set; }

        public string Rules { get; set; }

    }

}
