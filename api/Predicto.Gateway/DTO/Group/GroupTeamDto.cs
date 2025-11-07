namespace Predicto.Gateway.DTO.Group
{
    public class GroupTeamDto
    {
        public string TeamName { get; internal set; }
        public int Won { get; set; }
        public int Lost { get; set; }
        public int Drawn { get; set; }
        public int Played { get; set; }
        public int Points { get; set; }
        public int GoalsDiference { get; set; }
    }
}
