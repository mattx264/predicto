using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.DataCollector.FootballApi
{
    public class FootballApiCollector
    {
        private readonly RestClient _restClient = new RestClient();
        public FootballApiCollector()
        {

        }
        public async Task CollectCountries()
        {
            var countries = await _restClient.GetAsync("https://v3.football.api-sports.io/countries");
            File.WriteAllText("countries.json", countries);
        }
    }
}