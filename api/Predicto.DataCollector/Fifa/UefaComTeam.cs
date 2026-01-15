using System.Net.Sockets;

namespace Predicto.DataCollector.Fifa
{
    internal class UefaComTeam
    {
        public string? Name { get; set; }
        public string? Url { get; set; }
        public string? ImageSrcSet { get; set; }
        public string? TeamName { get; set; }

    }
    internal class UefaComTeamDetails
    {
        public string Id { get; set; }
        public string ImageSrcSet { get; set; }
        public int gamesWon { get; set; }
        public int gamesDraw { get; set; }
        public int gamesLost { get; set; }
        public int totalGames { get; set; }
    }
}