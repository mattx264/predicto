namespace Predicto.Gateway.DTO.Blog
{
    public class PlayerBlogDto
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public required string Name { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int? Age { get; set; }
        public DateOnly? Birthday { get; set; }
        public string? BirthPlace { get; set; }
        public required string BirthCountry { get; set; }
        public required string? Nationality { get; set; }
        public required int? Height { get; set; }
        public required int? Weight { get; set; }
        public int? ShirtNumber { get; set; }
        public string? Position { get; set; } //Goalkeeper, Defender, Midfielder, Forward
        public string? PhotoUrl { get; set; }
        public int? MarketValue { get; set; }
        public string? Bio { get; set; }
        public string TeamName { get; set; }
        public int MatchesPlayed { get; set; }
        public int Minutesplayed { get; set; }
        public int Goals { get; set; }
        public int? Saves { get; set; }
        public int? Cleansheets { get; set; }
        public double? PassingAccuracy { get; set; }
        public double? TopSpeed { get; set; }
        public double? DistanceCovered { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
        public int? Tackles { get; set; }
        public int? BallsRecovered { get; set; }
        public int? Assists { get; set; }
        public int? TotalAttempts { get; set; }
    }
}
