using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.DataCollector.Models
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Birth
    {
        public string date { get; set; }
        public string place { get; set; }
        public string country { get; set; }
    }

  

    public class ParametersPlayer
    {
        public string player { get; set; }
    }

    public class PlayerDetails
    {
        public int id { get; set; }
        public string name { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public int? age { get; set; }
        public Birth birth { get; set; }
        public string nationality { get; set; }
        public string height { get; set; }
        public string weight { get; set; }
        public int number { get; set; }
        public string position { get; set; }
        public string photo { get; set; }
    }

    public class ResponsePlayer
    {
        public PlayerDetails player { get; set; }
    }

    public class RootPlayer
    {
        public string get { get; set; }
        public ParametersPlayer parameters { get; set; }
        public List<object> errors { get; set; }
        public int results { get; set; }
        public Paging paging { get; set; }
        public List<ResponsePlayer> response { get; set; }
    }


}
