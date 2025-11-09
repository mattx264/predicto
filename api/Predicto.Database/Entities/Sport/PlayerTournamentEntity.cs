using Predicto.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Sport
{
    public class PlayerTournamentEntity : IEntity
    {
        public int Id { get; set; }
        public virtual PlayerEntity? Player { get; set; }
        public virtual TournamentEntity Tournament { get; set; }
        public int PlayerId { get; set; }
        public int TournamentId { get; set; }
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

        public bool IsActive { get; set; }
        public int? Assists { get; set; }
        public int? TotalAttempts { get; set; }
        public int? Blocks { get; set; }
        public int? OwnGoalsConceded { get; set; }
        public int? FoulsSuffered { get; set; }
        public int? FoulsCommitted { get; set; }
        public int? ClearChances { get; set; }
        public int? TimesInPossession { get; set; }
        public int? FreeKicksTaken { get; set; }
        public string? CrossesCompleted { get; set; }
        public string? PassesCompleted { get; set; }
        public int? AttemptsConcededOnTarget { get; set; }
        public int? ClearancesAttempted { get; set; }
        public int? PenaltiesConceded { get; set; }
        public int? Offsides { get; set; }
        public int? CornersTaken { get; set; }
        public int? PenaltiesScored { get; set; }
        public int? PenaltiesMissed { get; set; }
        public int? PenaltiesAwarded { get; set; }
        public double? CrossingAccuracy { get; set; }
    }
}
