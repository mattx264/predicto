using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.DataCollector.Models
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    
    public class ParametersTeam
    {
        public string team { get; set; }
    }

    public class Player
    {
        public int id { get; set; }
        public string name { get; set; }
        public int? age { get; set; }
        public int? number { get; set; }
        public string position { get; set; }
        public string photo { get; set; }
    }

    public class ResponseTeam
    {
        public TeamResponse team { get; set; }
        public List<Player> players { get; set; }
    }

    public class TeamModelRoot
    {
        public string get { get; set; }
        public ParametersTeam parameters { get; set; }
        public List<object> errors { get; set; }
        public int results { get; set; }
        public Paging paging { get; set; }
        public List<ResponseTeam> response { get; set; }
    }

    public class TeamResponse
    {
        public int id { get; set; }
        public string name { get; set; }
        public string logo { get; set; }
    }


}
