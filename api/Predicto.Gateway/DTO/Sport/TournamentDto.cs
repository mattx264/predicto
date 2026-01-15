namespace Predicto.Gateway.DTO.Sport
{
    public class TournamentDto
    {
        //Football World Cup, UEFA Champions League, NBA Finals, Wimbledon, Super Bowl, World Series, Stanley Cup, Rugby World Cup, ICC Cricket World Cup
        public int Id { get; set; }
        public int SportCategoryId { get; set; }
        public required string Name { get; set; }
         public string? Description { get; set; }
        public string? League { get; set; }
        public int MatchesCount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? LogoUrl { get; set; }
    }
}
