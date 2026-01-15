namespace Predicto.Gateway.DTO.Sport
{
    public class PlayerDto : PlayerBasicInfoDto
    {
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
    public class PlayerBasicInfoDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Position { get; set; }
        public string? ImageUrl { get; set; }
        public int? ShirtNumber { get; set; }
       

    }

}
