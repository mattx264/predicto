namespace Predicto.Gateway.DTO.Group
{
    public class GroupDto
    {
        public int Id { get; internal set; }
        public string Name { get; internal set; }
        public IList<GroupTeamDto> Teams { get; internal set; }
    }
}
