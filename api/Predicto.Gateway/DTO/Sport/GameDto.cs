namespace Predicto.Gateway.DTO.Sport
{
    public class GameDetailsDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public required IList<GameDetailsTeamDto> Teams { get; set; }
        public string? FinalScore { get; set; }
        public int TournamentId { get; internal set; }
        public string? Referee { get; internal set; }
        public required IList<HeadToHeadDto> HeadToHead { get; set; }
    }
    public class GameDetailsTeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public required string LogoUrl { get; set; }
        public string? Tactic { get; set; }
        public required IList<PlayerBasicInfoDto> Players { get; set; }
        public required string Coach { get;  set; }
        public required string FormLastGames { get;  set; }
    }
    public class HeadToHeadDto
    {
        public int GameId { get; set; }
        public DateTime GameDate { get; set; }
        public string? FinalScore { get; set; }
        public int TeamId1 { get; set; }
        public int TeamId2 { get; set; }
        public required string TeamName1 { get; set; }
        public required string TeamName2 { get; set; }
    }
    public class GameListDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }

        public required IList<GameListTeamDto> Teams { get; set; }
        public string? FinalScore { get; set; }

    }
    public class GameListTeamDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string LogoUrl { get; set; }
    }

}
