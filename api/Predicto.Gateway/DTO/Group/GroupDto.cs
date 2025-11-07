namespace Predicto.Gateway.DTO.Group
{
    public class GroupDto
    {
        public int Id { get; internal set; }
        public required string Name { get; set; }
        public required IList<GroupTeamDto> Teams { get; set; }
    }
}
