using Predicto.Database.Interfaces;
using Predicto.Database.Entities.Sport;

namespace Predicto.Database.Entities.Sport
{
    public class TournamentTeamEntity : IEntity
    {
        public int Id { get; set; }
        public int TeamEntityId { get; set; }
        public virtual required TeamEntity TeamEntity { get; set; }
        public int TournamentEntityId { get; set; }
        public virtual required TournamentEntity TournamentEntity { get; set; }
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
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
        public bool IsActive { get; set; } = true;
     
    }
}
