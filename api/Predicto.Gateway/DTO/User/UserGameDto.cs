namespace Predicto.Gateway.DTO.User
{
    public class UserGameDto
    {
        public int UserId { get; set; }
        public int GameId { get; set; }
        public string PredictedScore { get; set; } // e.g., "2:1"
    }
}
