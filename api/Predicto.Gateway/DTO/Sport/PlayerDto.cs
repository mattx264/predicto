namespace Predicto.Gateway.DTO.Sport
{
    public class PlayerDto: PlayerBasicInfoDto
    {
    }
    public class PlayerBasicInfoDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string ImageUrl { get; set; }
        public int? ShirtNumber { get; internal set; }
    }

}
