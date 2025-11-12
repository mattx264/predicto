using Predicto.Database.Entities.Sport;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Gateway.DTO.Room
{
    public class RoomGameDto
    {
        public int GameId { get; set; }
        public required IEnumerable<TeamUserBetDto> Teams { get; set; }
        public int RoomId { get; internal set; }
        //   public  MyProperty { get; set; }
    }
    public class TeamUserBetDto(TeamEntity team) : TeamListDto(team)
    {
        public  string? Bet { get; set; }
    }
    public class RoomGameBetDto
    {
        public int GameId { get; set; }
        public int RoomId { get; set; }
        public required IEnumerable<RoomGameBetTeamDto> RoomGameBetTeam { get; set; }    

    }
    public class RoomGameBetTeamDto
    {
        public int TeamId { get; set; }
        public required string Bet { get; set; }// W  -- L // 2 -- 3, 2 --2 
    }
}
