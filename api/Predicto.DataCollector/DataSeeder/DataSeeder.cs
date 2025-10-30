﻿using Predicto.Database.Entities.Sport;
using Predicto.Database.UnitOfWork;
using Predicto.DataCollector.Fifa;
using Predicto.DataCollector.Models;
using Predicto.Gateway.DTO.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Predicto.DataCollector.NewFolder
{
    public class DataSeeder
    {
        public DataSeeder()
        {
        }
        public async Task Seed()
        {
            using var unitOfWork = new UnitOfWork(new Database.PredictoDbContext());
            //  string[] fileEntries = Directory.GetFiles("C:\\Users\\mattx\\src\\predicto\\api\\Predicto.DataCollector\\Data/Teams/");
            // await SeedTeam(unitOfWork);

            FifaGamesSeed(unitOfWork);

            await unitOfWork.CompleteAsync();

            // await SeedPlayers(unitOfWork);
            // await unitOfWork.CompleteAsync();


        }
        private async Task SeedTeam(UnitOfWork unitOfWork)
        {
            string[] fileEntries = Directory.GetFiles("../../../../Predicto.DataCollector/Data/Teams/");

            foreach (string fileEntry in fileEntries)
            {
                var json = await File.ReadAllTextAsync(fileEntry);
                try
                {
                    var data = JsonSerializer.Deserialize<TeamModelRoot>(json);
                    var teamData = data.response[0].team;
                    var team = await unitOfWork.Team.FindAsync(t => t.FootballApiId == teamData.id);
                    if (team == null)
                    {
                        team = new TeamEntity
                        {
                            Name = teamData.name,
                            Slug = teamData.name.ToLower().Replace(" ", "-"),
                            FootballApiId = teamData.id,
                            ImageUrl = teamData.logo,
                            Type = TeamTypeEnum.National,


                        };
                        await unitOfWork.Team.AddAsync(team);
                    }
                    var players = data.response[0].players;
                    foreach (var player in players)
                    {
                        var names = player.name.Split(" ");
                        var playerEntity = new PlayerEntity
                        {
                            Name = player.name,
                            Slug = player.name.ToLower().Replace(" ", "-").Replace(".", "") + player.id,
                            FootballApiId = player.id,
                            Position = player.position,
                            ShirtNumber = player.number,
                            PhotoUrl = player.photo,
                            FirstName = names[0],
                            LastName = names[1],
                            BirthCountry = "Unknown",
                            Height = null,
                            Weight = null,
                            Nationality = "Unknown",
                            Birthday = default,
                            BirthPlace = "Unknown",

                        };
                        await unitOfWork.Player.AddAsync(playerEntity);
                        await unitOfWork.TeamPlayer.AddAsync(new TeamPlayerEntity()
                        {
                            PlayerEntity = playerEntity,
                            TeamEntity = team,
                        });
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error deserializing file {fileEntry}: {ex.Message}");
                    //  throw;
                }
            }
        }
        private async Task SeedPlayers(UnitOfWork unitOfWork)
        {
            string[] fileEntries = Directory.GetDirectories("../../../../Predicto.DataCollector/Data/Teams/Players/");

            foreach (string countryFolder in fileEntries)
            {
                foreach (string playerFile in Directory.GetFiles(countryFolder))
                {
                    var json = await File.ReadAllTextAsync(playerFile);
                    try
                    {
                        var data = JsonSerializer.Deserialize<RootPlayer>(json);
                        var playerData = data.response[0].player;
                        var player = new PlayerEntity
                        {
                            Name = playerData.name,
                            Slug = playerData.name.ToLower().Replace(" ", "-").Replace(".", ""),
                            FootballApiId = playerData.id,
                            FirstName = playerData.firstname,
                            LastName = playerData.lastname,
                            Nationality = playerData.nationality,
                            BirthPlace = playerData.birth.place,
                            BirthCountry = playerData.birth.country,
                            Birthday = String.IsNullOrEmpty(playerData.birth.date) ? default : DateOnly.Parse(playerData.birth.date),
                            Height = int.TryParse(playerData.height, out var height) ? height : (int?)null,
                            Weight = int.TryParse(playerData.weight, out var weight) ? weight : (int?)null,
                            PhotoUrl = playerData.photo,
                            Age = playerData.age,
                            Position = playerData.position,

                        };
                        await unitOfWork.Player.AddAsync(player);
                        var countryName = countryFolder.Split("/").Last();
                        var team = await unitOfWork.Team.FindAsync(t => t.Name == countryName);
                        if (team == null)
                        {
                            throw new Exception("Team not found for player " + player.Name);
                        }

                        await unitOfWork.TeamPlayer.AddAsync(new TeamPlayerEntity()
                        {
                            PlayerEntity = player,
                            TeamEntityId = team.Id,

                        });
                        await unitOfWork.CompleteAsync();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error deserializing file {playerFile}: {ex.Message}");
                        //throw;
                    }
                }
            }
        }

        private void UefaPlayerSeed(UnitOfWork unitOfWork)
        {
            var uefa = new UefaCom();
            uefa.SeedData(unitOfWork);
        }
        private void FifaGamesSeed(UnitOfWork unitOfWork)
        {
            var fifa = new FifaCom();
            fifa.SeedData(unitOfWork);
        }
    }
}
