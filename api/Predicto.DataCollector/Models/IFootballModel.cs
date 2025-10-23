using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.DataCollector.Models
{
    public class Paging
    {
        public int current { get; set; }
        public int total { get; set; }
    }

    public class Parameters
    {
        public string league { get; set; }
        public string season { get; set; }
    }

    public class Response
    {
        public Team team { get; set; }
        public Venue venue { get; set; }
    }

    public class Root
    {
        public string get { get; set; }
        public Parameters parameters { get; set; }
        public List<object> errors { get; set; }
        public int results { get; set; }
        public Paging paging { get; set; }
        public List<Response> response { get; set; }
    }

    public class Team
    {
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string country { get; set; }
        public int? founded { get; set; }
        public bool national { get; set; }
        public string logo { get; set; }
    }

    public class Venue
    {
        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public int capacity { get; set; }
        public string surface { get; set; }
        public string image { get; set; }
    }

}
