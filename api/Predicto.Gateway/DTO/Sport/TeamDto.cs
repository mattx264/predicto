
using Predicto.Database.Entities.Sport;

namespace Predicto.Gateway.DTO.Sport
{
    public class TeamDetailsDto(TeamEntity x) : TeamListDto(x)
    {
        public required string Coach { get;  set; }
        public required List<PlayerBasicInfoDto> Players { get;  set; }
        public required string FormLastGames { get;  set; }
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
