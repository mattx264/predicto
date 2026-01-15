using System;
using System.Collections.Generic;
using System.Text;

namespace Predicto.DataCollector.Models.uefa
{
    internal class UefaGameModel
    {
        public string id { get; set; }
        public UefaGameModelTeam awayTeam { get; set; }
        public UefaGameModelTeam homeTeam { get; set; }
        public UefaGameModelKickOffTime kickOffTime { get; set; }
        public UefaGameModelscore score { get; set; }
        public IList<UefaGameModelreferees> referees { get; set; }
        public UefaGameModelstadium stadium { get; set; }

        public string status { get; set; }// "UPCOMING",

    }
    internal class City
    {
        public string countryCode { get; set; }
        public string id { get; set; }
        public Translations translations { get; set; }
    }

    public class Geolocation
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
    }

    public class Images
    {
        public string MEDIUM_WIDE { get; set; }
        public string LARGE_ULTRA_WIDE { get; set; }
    }


    internal class Pitch
    {
        public int length { get; set; }
        public int width { get; set; }
    }

    internal class UefaGameModelstadium
    {
        public string address { get; set; }
        public int capacity { get; set; }
        public City city { get; set; }
        public string countryCode { get; set; }
        public Geolocation geolocation { get; set; }
        public string id { get; set; }
        public Images images { get; set; }
        public string openingDate { get; set; }
        public Pitch pitch { get; set; }
        public Translations translations { get; set; }
    }

    internal class Translations
    {
        public Name name { get; set; }
    }
    internal class UefaGameModelTeam
    {
        public string id { get; set; }
    }
    internal class UefaGameModelKickOffTime
    {
        public DateOnly date { get; set; }
        public DateTime dateTime { get; set; }
        public int utcOffsetInHours { get; set; }
    }
    internal class UefaGameModelscore
    {
        public UefaGameModelscoreinfo regular { get; set; }
        public UefaGameModelscoreinfo total { get; set; }

    }
    internal class UefaGameModelreferees
    {
        // public string countryCode { get; set; }
        // public string gender { get; set; }
        //  public string id { get; set; }
        public string role { get; set; }
        public UefaGameModelperson person { get; set; }
        public string id { get; set; }
        public Translations translations { get; set; }
    }
    internal class UefaGameModelperson
    {
        public string countryCode { get; set; }
        public string gender { get; set; }
        public string id { get; set; }
        public Translations translations { get; set; }
    }


    internal class Name
    {
        public string EN { get; set; }
        public string FR { get; set; }
        public string DE { get; set; }
        public string ES { get; set; }
        public string PT { get; set; }
        public string IT { get; set; }
        public string RU { get; set; }
        public string ZH { get; set; }
        public string TR { get; set; }
        public string HU { get; set; }
        public string CS { get; set; }
        public string NL { get; set; }
    }
    internal class UefaGameModelscoreinfo
    {
        public int away { get; set; }
        public int home { get; set; }
    }



}
