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
            var countries = await _restClient.GetAsync("https://api.fifa.com/api/v3/live/football/520/288329/288330/400019338?language=en");
            File.WriteAllText("countries.json", countries);
        }
    }
}