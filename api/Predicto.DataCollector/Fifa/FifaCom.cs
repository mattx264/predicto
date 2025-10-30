using Predicto.Database.Entities.Sport;
using Predicto.Database.UnitOfWork;
using Predicto.DataCollector.Scraber;
using Predicto.Gateway.DTO.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Predicto.DataCollector.Fifa
{
    public class FifaCom
    {
        string dataPath = "C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\Fifacom\\Games\\";
        public FifaCom() { }
        public async Task Start()
        {
            var rest = new RestClient();

            using var scraber = new BaseScraber<string>();
            scraber.StartChrome("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/qualifiers/uefa/scores-fixtures?country=PL&wtw-filter=ALL", 10000);
            var elements = scraber.GetElements(".grid-container-custom .row a");
            //var list = new List<string>();
            //foreach (var element in elements) {
            //    list.Add(element.GetAttribute("href"));
            //}
            //File.WriteAllText("C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\Fifacom\\fifa_links.json", JsonSerializer.Serialize(list));
            foreach (var page in elements)
            {
                var url = page.GetAttribute("href");
                var parts = url.Split('/');

                //https://www.fifa.com/en/match-centre/match/520/288329/288330/400019331
                //https://api.fifa.com/api/v3/live/football/520/288329/288330/400019338?language=en 
                if (File.Exists($"{dataPath}{parts[9]}.json"))
                {
                    continue;
                }
                try
                {
                    var response = await rest.GetAsync($"https://api.fifa.com/api/v3/live/football/{parts[6]}/{parts[7]}/{parts[8]}/{parts[9]}?language=en");
                    File.WriteAllText($"{dataPath}{parts[9]}.json", response);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    continue;
                }

            }
            //   rest.

            //        File.WriteAllText(File.Exists("test.txt") ? "test.txt" : "test.txt", JsonSerializer.Serialize(data));

        }
        internal async Task SeedData(UnitOfWork unitOfWork)
        {
            var jsonFiles = Directory.GetFiles(dataPath, "*.json");
            foreach (var jsonFile in jsonFiles)
            {
                var jsonData = File.ReadAllText(jsonFile);
                var gameData = JsonSerializer.Deserialize<FifaComGameModel>(jsonData);
                var teamHome = await unitOfWork.Team.FindAsync(t => t.Name == gameData.HomeTeam.TeamName[0].Description);
                var teamAway = await unitOfWork.Team.FindAsync(t => t.Name == gameData.AwayTeam.TeamName[0].Description);
                var gameEntity = new GameEntity
                {
                    TournamentId = 1,// FIFA World Cup Qualifiers
                    TeamIdOne = teamHome.Id,
                    TeamIdTwo = teamAway.Id,
                    FinalScore = $"{gameData.HomeTeam.Score}-{gameData.AwayTeam.Score}",
                    StartGame = gameData.Date,
                    IsActive = true,
                    Referee = gameData.Officials[0].Name[0].Description
                };
                await unitOfWork.Game.AddAsync(gameEntity);
            }
            await unitOfWork.CompleteAsync();
        }

    }
}
