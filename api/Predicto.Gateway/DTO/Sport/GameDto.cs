namespace Predicto.Gateway.DTO.Sport
{
    public class GameDto
    {
        public int Id { get; set; }
        public int TournamentId { get; set; }
        public required string FinalScoore { get; set; }// 1:1 (4:5) //
        public DateTime StartGame { get; set; }
        public DateTime? EndGame { get; set; }
    }
}
