
using Predicto.Database.Entities.Sport;

namespace Predicto.Gateway.DTO.Sport
{
    public class TeamListRankingDto:TeamDetailsDto
    {
        public TeamListRankingDto(TournamentTeamEntity tte) : base(tte.TeamEntity)
        {
            FormLastGames = tte.FormLastGames;
            GameCount = tte.GameCount;
            GamesWon = tte.GamesWon;
            GamesDraw = tte.GamesDraw;
            GamesLost = tte.GamesLost;
            Goals = tte.Goals;
            GoalsConceded = tte.GoalsConceded;
            PossessionPercentage = tte.PossessionPercentage;
            PassingAccuracyPercentage = tte.PassingAccuracyPercentage;
            BallsRecovered = tte.BallsRecovered;
            TacklesWon = tte.TacklesWon;
            CleanSheets = tte.CleanSheets;
            Saves = tte.Saves;
            DistanceCoveredKm = tte.DistanceCoveredKm;
            YellowCards = tte.YellowCards;
            RedCards = tte.RedCards;
        }
        public string FormLastGames { get; set; } = string.Empty;// WWDLD
        public int GameCount { get; set; }
        public int GamesWon { get; set; }
        public int GamesDraw { get; set; }
        public int GamesLost { get; set; }
        public int Goals { get; set; }

        public int GoalsConceded { get; set; }
        public double PossessionPercentage { get; set; }
        public double PassingAccuracyPercentage { get; set; }
        public int BallsRecovered { get; set; }
        public int TacklesWon { get; set; }
        public int CleanSheets { get; set; }
        public int Saves { get; set; }
        public double DistanceCoveredKm { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
    }
    public class TeamDetailsDto(TeamEntity x) : TeamListDto(x)
    {
        public required string Coach { get;  set; }
        public required List<PlayerBasicInfoDto> Players { get;  set; }
    }
    public class TeamListDto
    {
        public TeamListDto(TeamEntity x)
        {
            Id = x.Id;
            Name = x.Name;
            Slug = x.Slug;
            ImageUrl = x.ImageUrl;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string ImageUrl { get; set; }
    }
}
