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
        public int PlayerId { get; set; }
        public int TournamentId { get; set; }
        public int MatchesPlayed { get; set; }
        public int Minutesplayed { get; set; }
        public int Goals { get; set; }
        public int Saves { get; set; }
        public int Cleansheets { get; set; }
        public int Passingaccuracy { get; set; }
        public int Topspeed { get; set; }
        public int Distancecovered { get; set; }
        public int Yellowcards { get; set; }
        public int Redcards { get; set; }

        public bool IsActive { get; set; }

    }
}
