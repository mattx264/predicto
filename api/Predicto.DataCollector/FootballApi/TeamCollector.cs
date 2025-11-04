
using Predicto.DataCollector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Predicto.DataCollector.FootballApi
{
    public class TeamCollector
    {
        private readonly RestClient _restClient = new RestClient();

        public TeamCollector()
        {

        }
        public async Task Start()
        {
            using var text = File.OpenRead("C:\\Users\\mattx\\src\\predicto\\api\\Predicto.DataCollector\\Data/country-uefa.json");
            var data = await JsonSerializer.DeserializeAsync<Root>(text);
            foreach (var team in data?.response)
            {
                var teamData = await _restClient.GetAsync($"https://v3.football.api-sports.io/players/squads?team={team.team.id}");
                File.WriteAllText($"C:\\Users\\mattx\\src\\predicto\\api\\Predicto.DataCollector\\Data\\Teams\\{team.team.name}.json", teamData, Encoding.UTF8);
                Thread.Sleep(6000);
            }
        }
    }
}
