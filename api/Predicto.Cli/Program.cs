// See https://aka.ms/new-console-template for more information
using Predicto.DataCollector.FootballApi;
using Predicto.DataCollector.NewFolder;

Console.WriteLine("Hello, World!");
//new TeamCollector().Start().Wait();
//new PlayerCollector().Start().Wait();
new DataSeeder().Seed().Wait();