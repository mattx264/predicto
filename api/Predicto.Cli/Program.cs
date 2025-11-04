// See https://aka.ms/new-console-template for more information
using Predicto.DataCollector.Fifa;
using Predicto.DataCollector.FootballApi;
using Predicto.DataCollector.NewFolder;
using Predicto.DataCollector.Scraber;

//new TeamCollector().Start().Wait();
//new PlayerCollector().Start().Wait();

// main data importer
new DataSeeder().Seed().Wait();


//new FootballApiCollector().CollectCountries().Wait();



//import html wiht payers
//new UefaCom().Start();

//FIFA COM list of matches
//new FifaScraber().StartChrome();

//FIFA COM collect match data API
//new FifaCom().Start().Wait();
