namespace Predicto.Database.Entities.Sport
{
    public class GameGroupTeamEntity
    {
        public int Id { get; set; }
        public virtual TeamEntity Team { get; set; }
        public int Won { get; set; }
        public int Lost { get; set; }
        public int Drawn { get; set; }
        public int Played { get; set; }
        public int Points { get; set; }
        public int GoalsDiference { get; set; }


    }
}
