
namespace Predicto.Gateway.DTO.Sport
{
    public class TeamDetailsDto : TeamListDto
    {
        public string Coach { get; internal set; }
        public List<PlayerBasicInfoDto> Players { get; internal set; }
        public string FormLastGames { get; internal set; }
    }
    public class TeamListDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Slug { get; set; }
        public required string ImageUrl { get; set; }
    }
}
