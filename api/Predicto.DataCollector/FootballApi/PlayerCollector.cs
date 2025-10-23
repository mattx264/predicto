using Predicto.DataCollector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Predicto.DataCollector.FootballApi
{
    public class PlayerCollector
    {
        private readonly RestClient _restClient = new RestClient();
        public PlayerCollector()
        {
            //   rest.GetExampleAsync().Wait();
        }
        public async Task Start()
        {
            string playersDirectory = "C:\\Users\\mattx\\src\\predicto\\api\\Predicto.DataCollector\\Data/Teams/Players";
            string[] fileEntries = Directory.GetFiles("C:\\Users\\mattx\\src\\predicto\\api\\Predicto.DataCollector\\Data/Teams/");
            foreach (string fileEntry in fileEntries)
            {
                var json = await File.ReadAllTextAsync(fileEntry);
                try
                {
                    var data = JsonSerializer.Deserialize<TeamModelRoot>(json);
                    foreach (var team in data.response)
                    {
                        var countryPlayerFolder = playersDirectory + "/" + team.team.name;
                        if (!Directory.Exists(countryPlayerFolder))
                        {
                            Directory.CreateDirectory(countryPlayerFolder);
                        }
                        foreach (var player in team.players)
                        {
                            var playerPath = $"{countryPlayerFolder}/{player.name}-{player.id}.json";
                            if (!File.Exists(playerPath))
                            {
                                var playerData = await _restClient.GetAsync($"https://v3.football.api-sports.io/players/profiles?player={player.id}");
                                if (playerData.IndexOf("You have reached the request limit for the day") > -1 || playerData.IndexOf("Your account is suspended") > -1)
                                {
                                    throw new Exception("Limit for day reached");
                                }
                                File.WriteAllText(playerPath, playerData);
                                Thread.Sleep(6000);
                            }

                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error deserializing file {fileEntry}: {ex.Message}");
                    throw;
                }
               

            }

        }

    }
}
