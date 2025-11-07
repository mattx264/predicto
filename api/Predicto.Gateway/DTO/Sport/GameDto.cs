namespace Predicto.Gateway.DTO.Sport
{
    public class GameDetailsDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public IList<GameDetailsTeamDto> Teams { get; set; }
        public string? FinalScore { get; set; }
        public int TournamentId { get; internal set; }
        public string? Referee { get; internal set; }
        public IList<HeadToHeadDto> HeadToHead { get; set; }
    }
    public class GameDetailsTeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }
        public string? Tactic { get; set; }
        public IList<PlayerBasicInfoDto> Players { get; set; }
        public string Coach { get; internal set; }
        public string FormLastGames { get; internal set; }
    }
    public class HeadToHeadDto
    {
        public int GameId { get; set; }
        public DateTime GameDate { get; set; }
        public string FinalScore { get; set; }
        public int TeamId1 { get; set; }
        public int TeamId2 { get; set; }
        public string TeamName1 { get; set; }
        public string TeamName2 { get; set; }
    }
    public class GameListDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }

        public IList<GameListTeamDto> Teams { get; set; }
        public string? FinalScore { get; set; }

    }
    public class GameListTeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }
    }
  
}
