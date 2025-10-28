// See https://aka.ms/new-console-template for more information
using Predicto.DataCollector.FootballApi;
using Predicto.DataCollector.NewFolder;
using Predicto.DataCollector.Scraber;

//new TeamCollector().Start().Wait();
//new PlayerCollector().Start().Wait();
//new DataSeeder().Seed().Wait();

new FifaScraber().StartChrome(); 