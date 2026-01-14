using Castle.Components.DictionaryAdapter.Xml;
using HtmlAgilityPack;
using HtmlAgilityPack.CssSelectors.NetCore;
using Predicto.Database.Entities.Sport;
using Predicto.Database.Entities.Sport.Enums;
using Predicto.Database.UnitOfWork;
using Predicto.DataCollector.Models;
using Predicto.DataCollector.Scraber;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Predicto.DataCollector.Fifa
{
    public class UefaComChanpionship
    {
        string path = "C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\UefaClub\\";
        public UefaComChanpionship() { }
        public async Task SeedDataAsync(UnitOfWork unitOfWork)
        {
            //3
            await TeamsDetailsSeedData(unitOfWork);
        }
        public async Task Start()
        {
            //1
            // Teams();
            //2
            //await TeamsDetails();
            //3 SeedData

            //1
            await Player();

        }
        public void Teams()
        {
            using var scraber = new BaseScraber<string>();
            scraber.StartChrome("https://www.uefa.com/uefachampionsleague/clubs/", 0);
            var teams = scraber.GetElements(".teams-overview_group a");
            var json = JsonSerializer.Serialize(teams.Select(x => new UefaComTeam
            {
                Name = x.GetAttribute("innerText").Replace("\r\n", "").Trim(),
                Url = x.GetAttribute("href")
            }).ToList());
            File.WriteAllText($"{path}list.json", json, Encoding.UTF8);


        }
        public async Task TeamsDetails()
        {
            var jsonText = await File.ReadAllTextAsync($"{path}list.json");
            try
            {
                var teams = JsonSerializer.Deserialize<List<UefaComTeam>>(jsonText);
                if (teams == null)
                {
                    Console.WriteLine("Failed to deserialize teams list - teams is null");
                    return;
                }

                foreach (var team in teams)
                {
                    var href = team.Url;
                    if (href == null)
                    {
                        continue;
                    }
                    using var clubScraber = new BaseScraber<string>();
                    clubScraber.StartChrome(href, 0);
                    var names = clubScraber.GetElements(".team-name");
                    if (names == null || names.Count < 2)
                    {
                        Console.WriteLine($"Invalid team names collection for {href}");
                        continue;
                    }

                    var nameAttribute = names[1]?.GetAttribute("innerText");
                    if (nameAttribute == null)
                    {
                        Console.WriteLine($"Missing innerText attribute for {href}");
                        continue;
                    }

                    var name = nameAttribute.Replace("\r\n", "").Trim();
                    var img = clubScraber.GetElementFromShadowDom("pk-badge", "img");
                    var srcset = img.GetAttribute("srcset");
                    var body = clubScraber.GetElement(".body");
                    if (body == null)
                    {
                        throw new Exception("body is null");
                    }

                    var gamesStat = clubScraber.GetElementsFromShadowDom("pk-donut-chart", ".donut-chart-legend--series div");
                    if (gamesStat == null || gamesStat.Count < 3)
                    {
                        Console.WriteLine($"Invalid games statistics collection for {name}");
                        continue;
                    }

                    var gamesWonAttr = gamesStat[0]?.GetAttribute("innerText");
                    var gamesDrawAttr = gamesStat[1]?.GetAttribute("innerText");
                    var gamesLostAttr = gamesStat[2]?.GetAttribute("innerText");

                    if (gamesWonAttr == null || gamesDrawAttr == null || gamesLostAttr == null)
                    {
                        Console.WriteLine($"Missing game statistics attributes for {name}");
                        continue;
                    }

                    var gamesWon = gamesWonAttr.Trim();
                    var gamesDraw = gamesDrawAttr.Trim();
                    var gamesLost = gamesLostAttr.Trim();
                    var totalGames = int.Parse(gamesWon) + int.Parse(gamesDraw) + int.Parse(gamesLost);
                    var fileName = FifacomHelper.FileNameSanitizer(name);
                    var bodyInnerHtml = body.GetAttribute("innerHTML");
                    if (bodyInnerHtml != null)
                    {
                        File.WriteAllText($"{path}{fileName}.html", bodyInnerHtml, Encoding.UTF8);
                    }

                    var json = JsonSerializer.Serialize(teams.Select(x => new UefaComTeamDetails
                    {
                        ImageSrcSet = srcset,
                        gamesWon = int.Parse(gamesWon),
                        gamesDraw = int.Parse(gamesDraw),
                        gamesLost = int.Parse(gamesLost),
                        totalGames = totalGames
                    })
                    );
                    File.WriteAllText($"{path}{fileName}.json", json, Encoding.UTF8);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
        public async Task TeamsDetailsSeedData(UnitOfWork unitOfWork)
        {
            var chapionsLeague = await unitOfWork.Tournament.FindAsync(t => t.Name == "Champions League");
            if (chapionsLeague == null)
            {
                throw new Exception("Tournament not found: Champions League");
            }
            string[] fileEntries = Directory.GetFiles($"{path}\\*.html");
            foreach (var file in fileEntries)
            {
                var json = await File.ReadAllLinesAsync(file.Replace(".html", ".json"));
                var data = JsonSerializer.Deserialize<UefaComTeamDetails>(json[0]);
                var html = File.ReadAllText(file);
                var doc = new HtmlAgilityPack.HtmlDocument();
                doc.LoadHtml(html);
                var names = doc.QuerySelectorAll(".team-name");
                var fullName = names[0].InnerText.Replace("\r\n", "").Trim();
                var name = names[1].InnerText.Replace("\r\n", "").Trim();
                var teamCheck = await unitOfWork.Team.FindAsync(t => t.Name == name);
                if (teamCheck != null)
                {
                    continue;
                }
                var teamEntity = new TeamEntity()
                {
                    Name = name,
                    Slug = FifacomHelper.TeamNormalization(name),
                    FullName = fullName,
                    Code = doc.QuerySelector(".team-country-name").InnerText,
                    ImageUrl = data.ImageSrcSet,
                    Coach = "", //doc.QuerySelectorAll("[column-key='coach'] span")[2].InnerText.Trim(),
                    Type = TeamTypeEnum.Club

                };
                await unitOfWork.Team.AddAsync(teamEntity, 1);
                var formLastGames = doc.QuerySelectorAll("pk-accordion-item-title div")[1].InnerText;
                await unitOfWork.Team.AddAsync(teamEntity, 1);
                var tournamentTeamEntity = new TournamentTeamEntity()
                {
                    TeamEntity = teamEntity,
                    TournamentEntity = chapionsLeague,
                    FormLastGames = formLastGames,
                    GameCount = data.totalGames,
                    GamesWon = data.gamesWon,
                    GamesDraw = data.gamesDraw,
                    GamesLost = data.gamesLost,
                    Goals = int.TryParse(GetValueListByLable(doc, "pk-num-stat-item", ".stat-label", "Goals", ".stat-value", 0), out var goalsValue) ? goalsValue : 0,
                    GoalsConceded = int.TryParse(GetValueListByLable(doc, "pk-num-stat-item", ".stat-label", "Goals conceded", ".stat-value", 0), out var goalsConcededValue) ? goalsConcededValue : 0,
                    PossessionPercentage = int.TryParse(GetValueListByLable(doc, "pk-num-stat-item", ".stat-label", "Possession (%)", ".stat-value", 0), out var PossessionPercentageValue) ? PossessionPercentageValue : 0,
                    PassingAccuracyPercentage = double.TryParse(GetValueListByLable(doc, "pk-num-stat-item", ".stat-label", "Passing accuracy (%)", ".stat-value", 0), out var PassingAccuracyPercentageValue) ? PassingAccuracyPercentageValue : 0,
                    BallsRecovered = 0,
                    TacklesWon = 0,
                    CleanSheets = 0,
                    Saves = 0,
                    DistanceCoveredKm = 0,
                    YellowCards = 0,
                    RedCards = 0,

                };
                await unitOfWork.TournamentTeamRepository.AddAsync(tournamentTeamEntity, 1);
                await unitOfWork.CompleteAsync();
            }

        }

        private string? GetValueListByLable(HtmlDocument doc, string listSelector, string labelSelector, string labelName, string valueSelector, int? praboblyIndex)
        {
            var elements = doc.QuerySelectorAll(listSelector);
            if (praboblyIndex != null)
            {
                var ele = elements[praboblyIndex.Value];
                var lab = ele.QuerySelector(labelSelector);
                if (lab.InnerText == labelName)
                {
                    var val = ele.QuerySelector(valueSelector);
                    return val.InnerText;
                }
            }
            foreach (var item in elements)
            {
                var lab = item.QuerySelector(labelSelector);
                if (lab.InnerText == labelName)
                {
                    var val = item.QuerySelector(valueSelector);
                    return val.InnerText;
                }
            }
            throw new Exception("Label not found: " + labelName);
        }

        public async Task Player()
        {
            string[] fileEntries = Directory.GetFiles($"{path}\\*.html");
            foreach (var file in fileEntries)
            {
                var jsonText = await File.ReadAllTextAsync(file);

                var teams = JsonSerializer.Deserialize<List<UefaComTeam>>(jsonText);
                foreach (var team in teams)
                {
                    using var clubScraber = new BaseScraber<string>();
                    clubScraber.StartChrome(team.Url + "squad/", 0);
                    var links = clubScraber.GetElements("pk-table-body a");
                    foreach (var link in links)
                    {
                        clubScraber.GetElementFromShadowDom("pk-identifier", "h2 span");
                    }
                    var json = JsonSerializer.Serialize(links.Select(x => x.GetAttribute("href")).ToList());
                    var fileName = FifacomHelper.FileNameSanitizer(team.Name);
                    File.WriteAllText($"{path}Players\\{fileName}.json", json, Encoding.UTF8);
                }
            }
        }
        public async Task PlayerOverView()
        {

            string[] fileEntries = Directory.GetFiles($"{path}\\*.json");
            foreach (var file in fileEntries)
            {
                var squad = JsonSerializer.Deserialize<List<string>>(file);
                foreach (var url in squad)
                {
                    using var clubScraber = new BaseScraber<string>();
                    clubScraber.StartChrome(url , 0);
                    var nameShadow = clubScraber.GetElementsFromShadowDom("pk-identifier", "h2 span");
                    var firstName = nameShadow[0].Text;
                    var lastName = nameShadow[1].Text;

                    var fileName = FifacomHelper.FileNameSanitizer($"{firstName}-{lastName}");
                    var json = JsonSerializer.Serialize(new
                    {
                        FirstName = firstName,
                        LastName = lastName
                    });
                    new PlayerEntity()
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        Name = firstName + " " + lastName,
                        Slug = FifacomHelper.TeamNormalization(firstName + "-" + lastName),
                        Age = null,
                        Birthday = null,
                        BirthCountry = null,
                        Nationality = null,
                        ClubNumber = null,
                        NationalTeamNumber = null,
                        Position = null,
                        PhotoUrl = null,

                    };
                   
                    File.WriteAllText($"{path}Players\\Overview\\{fileName}.json", json, Encoding.UTF8);
                }
            }
        }
        public async Task PlayerStats()
        {

            string[] fileEntries = Directory.GetFiles($"{path}\\*.json");
            foreach (var file in fileEntries)
            {
                var squad = JsonSerializer.Deserialize<List<string>>(file);
                foreach (var url in squad)
                {
                    using var clubScraber = new BaseScraber<string>();
                    clubScraber.StartChrome(url + "statistics/", 0);// <--- statistics page
                    var nameShadow = clubScraber.GetElementsFromShadowDom("pk-identifier", "h2 span");
                    var firstName = nameShadow[0].Text;
                    var lastName = nameShadow[1].Text;

                    var fileName = FifacomHelper.FileNameSanitizer($"{firstName}-{lastName}-statistics");
                    var json = JsonSerializer.Serialize(new
                    {
                       
                    });
                  
                    new PlayerTournamentEntity()
                    {

                    };
                    File.WriteAllText($"{path}Players\\Stats\\{fileName}.json", json, Encoding.UTF8);
                }
            }
        }
        //internal async Task SeedTeamAsync(UnitOfWork unitOfWork)
        //{
        //    bool add = false;
        //    string[] fileEntries = Directory.GetFiles($"{path}");
        //    foreach (var file in fileEntries)
        //    {
        //        var html = File.ReadAllText(file);
        //        var doc = new HtmlAgilityPack.HtmlDocument();
        //        doc.LoadHtml(html);
        //        var name = doc.QuerySelector(".team-name").InnerText;
        //        //add
        //        if (add)
        //        {
        //            var team = new TeamEntity()
        //            {
        //                Name = name,
        //                Slug = name.Replace(" ", ""),
        //                Coach = doc.QuerySelectorAll("[column-key='coach'] span")[2].InnerText.Trim(),
        //                Code = "",
        //                FormLastGames = doc.QuerySelectorAll("#accordion-item-0 pk-accordion-item-title div")[1].InnerText,
        //                ImageUrl = ""
        //            };
        //            await unitOfWork.Team.AddAsync(team, 1);
        //        }
        //        else
        //        {
        //            var teamName = FifacomHelper.TeamNormalization(name);
        //            var team = await unitOfWork.Team.FindAsync(x => x.Name == teamName);
        //            if (team == null)
        //            {
        //                throw new Exception("Team not found: " + teamName);
        //            }
        //            team.Coach = doc.QuerySelectorAll("[column-key='coach'] span")[2].InnerText.Trim();
        //            team.FormLastGames = doc.QuerySelectorAll("#accordion-item-0 pk-accordion-item-title div")[1].InnerText;

        //        }
        //    }
        //    await unitOfWork.CompleteAsync();
        //}

        internal async Task SeedData(UnitOfWork unitOfWork)
        {

            string[] fileEntries = Directory.GetDirectories($"{path}Players");
            var teams = await unitOfWork.Team.GetAllAsync();

            foreach (var file in fileEntries.Skip(51))
            //   foreach (var file in fileEntries)
            {

                foreach (var player in Directory.GetFiles(file))
                {
                    try
                    {
                        var teamName = FifacomHelper.TeamNormalization(file.Split("\\").Last()).ToLower();
                        var team = teams.FirstOrDefault(t => t.Name.ToLower() == teamName);
                        if (team == null)
                        {
                            throw new Exception("Team not found: " + teamName);
                        }
                        var html = File.ReadAllText(player);
                        var doc = new HtmlAgilityPack.HtmlDocument();
                        doc.LoadHtml(html);
                        var names = doc.QuerySelector("h2[slot]").InnerText.Trim().Split(" ").Where(x => x.Length > 0).Select(x => x.Trim()).ToArray();


                        // var db = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[5]/pk-identifier/span[2]").InnerText;
                        // var dbDate = db.Split("(")[0];
                        // var age = db.Split("(")[1].Replace("(", "").Replace(")", "");
                        //var dbBirthDate = DateTime.Parse(dbDate);
                        // var dbPlace = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[4]/pk-identifier/span[2]").InnerText;
                        // var height = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[6]/pk-identifier/span[2]")?.InnerText;
                        // var weight = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[7]/pk-identifier/span[2]")?.InnerText;

                        //if (db != null)
                        //{
                        //    playerEntity.Birthday = DateTime.Parse(db);
                        //}
                        var playerEntity = (PlayerEntity)null;
                        if (names.Length == 1)
                        {
                            playerEntity = unitOfWork.Player.FindAsync(p => p.Name.Contains(names[0])
                             && p.Teams.Contains(team)).Result;
                            if (playerEntity == null)
                            {
                                throw new Exception("Name is invalid");
                            }
                        }
                        else
                        {

                            var firstName = FifacomHelper.Capitalize(names[0].Trim());
                            var firstLetter = firstName.ToLower()[0];
                            var playerLastName = FifacomHelper.Capitalize(names[1].Trim());
                            playerEntity = unitOfWork.Player.FindAsync(p => p.LastName.ToLower() == playerLastName.ToLower()
                           && p.FirstName.ToLower()[0] == firstLetter
                           && p.Teams.Contains(team)).Result;
                            Console.WriteLine(firstName + " " + playerLastName);



                            if (playerEntity == null)
                            {
                                if (names.Length > 2)
                                {
                                    playerLastName = FifacomHelper.Capitalize(names.Last());
                                    playerEntity = unitOfWork.Player.FindAsync(p => p.LastName.ToLower() == playerLastName.ToLower() && p.FirstName.ToLower()[0] == firstLetter
                                     && p.Teams.Contains(team)).Result;

                                }
                                if (playerEntity == null)
                                {
                                    var lastnameWithoutSpecial = FifacomHelper.ReplaceSpecialCharacters(playerLastName);
                                    playerEntity = unitOfWork.Player.FindAsync(p => p.LastName.ToLower() == lastnameWithoutSpecial.ToLower() && p.FirstName.ToLower()[0] == firstLetter
                            && p.Teams.Contains(team)).Result;
                                }
                                if (playerEntity == null)
                                {
                                    playerEntity = new PlayerEntity()
                                    {
                                        Name = string.Join(" ", names),
                                        Slug = FifacomHelper.ReplaceSpecialCharacters(string.Join("-", names).ToLower()),
                                        LastName = playerLastName,
                                        FirstName = firstName,
                                        Teams = new List<TeamEntity> { team }
                                    };
                                }
                            }
                            playerEntity.FirstName = firstName;
                        }

                        var profileStats = doc.QuerySelectorAll(".player-profile pk-identifier");
                        foreach (var stat in profileStats)
                        {
                            var statName = stat.QuerySelector("span:nth-child(1)")?.InnerText.Trim();
                            var statValue = stat.QuerySelector("span:nth-child(2)")?.InnerText.Trim();
                            switch (statName)
                            {
                                case "Date of birth":
                                    var dbDate = statValue.Split("(")[0].Trim();
                                    var age = statValue.Split("(")[1].Replace("(", "").Replace(")", "").Trim();
                                    var dbBirthDate = DateTime.ParseExact(dbDate, "d/M/yyyy", CultureInfo.InvariantCulture);
                                    playerEntity.Birthday = DateOnly.FromDateTime(dbBirthDate);
                                    playerEntity.Age = int.Parse(age);
                                    break;
                                case "Place of birth":
                                    playerEntity.BirthPlace = statValue;
                                    break;
                                case "Height":
                                    if (statValue != null)
                                    {
                                        playerEntity.Height = int.Parse(statValue.Replace(" cm", ""));
                                    }
                                    break;
                                case "Weight":
                                    if (statValue != null)
                                    {
                                        playerEntity.Weight = int.Parse(statValue.Replace(" kg", ""));
                                    }
                                    break;
                                case "Country":
                                case "Country of birth":
                                    if (statValue != null)
                                    {
                                        playerEntity.Nationality = statValue.Trim();
                                    }
                                    break;
                                case "Position":
                                    if (statValue != null)
                                    {
                                        playerEntity.Position = statValue.Trim();
                                    }
                                    break;
                                case "National Team number":
                                case "Shirt number":
                                    if (statValue != null)
                                    {
                                        playerEntity.NationalTeamNumber = int.Parse(statValue);
                                    }
                                    break;
                                case "Club number":
                                case "Club position":
                                case "National team position":
                                    break;
                                //    if (statValue != null)
                                //    {
                                //        playerEntity.ClubNumber = int.Parse(statValue);
                                //    }
                                //    break;
                                default:
                                    throw new Exception("Profile Key not found: " + statName);
                            }
                        }

                        var playerTournament = unitOfWork.PlayerTournamentRepository.FindAsync(p => p.PlayerId == playerEntity.Id && p.TournamentId == 1).Result;
                        if (playerTournament != null)
                        {
                            continue;
                        }


                        playerTournament = new PlayerTournamentEntity()
                        {
                            Player = playerEntity,
                            TournamentId = 1,

                            IsActive = true

                        };

                        var stats = doc.QuerySelectorAll(".stats-module pk-num-stat-item");
                        foreach (var stat in stats)
                        {
                            var statName = stat.QuerySelector("div:nth-child(2)")?.InnerText.Trim();
                            var statValue = stat.QuerySelector("div:nth-child(1)")?.InnerText.Trim();
                            switch (statName)
                            {
                                case "Matches played":
                                    playerTournament.MatchesPlayed = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Minutes played":
                                    playerTournament.Minutesplayed = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Goals":
                                    playerTournament.Goals = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Saves":
                                    playerTournament.Saves = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Clean sheets":
                                    playerTournament.Cleansheets = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Passing accuracy (%)":
                                    if (statValue != null && statValue.Contains("/"))
                                    {
                                        var vals = statValue.Split("/");

                                        playerTournament.PassingAccuracy = int.Parse(vals[0]) / int.Parse(vals[1]) * 100;
                                        break;
                                    }
                                    playerTournament.PassingAccuracy = statValue != null ? double.Parse(statValue.Replace("%", "")) : 0;
                                    break;
                                case "Crossing accuracy (%)":
                                    playerTournament.CrossingAccuracy = statValue != null ? double.Parse(statValue.Replace("%", "")) : 0;
                                    break;
                                case "Yellow cards":
                                    playerTournament.YellowCards = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Red cards":
                                    playerTournament.RedCards = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Top speed (km/h)":
                                    playerTournament.TopSpeed = statValue != null ? double.Parse(statValue) : 0;
                                    break;
                                case "Distance covered (km)":
                                    playerTournament.DistanceCovered = statValue != null ? double.Parse(statValue) : 0;
                                    break;
                                case "Tackles":
                                    playerTournament.Tackles = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Balls recovered":
                                    playerTournament.BallsRecovered = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Assists":
                                    playerTournament.Assists = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Total attempts":
                                    playerTournament.TotalAttempts = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Blocks":
                                    playerTournament.Blocks = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Own goals conceded":
                                    playerTournament.OwnGoalsConceded = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Penalties conceded":
                                    playerTournament.PenaltiesConceded = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Clearances attempted":
                                    playerTournament.ClearancesAttempted = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Attempts conceded on target":
                                    playerTournament.AttemptsConcededOnTarget = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Passes completed":
                                    playerTournament.PassesCompleted = statValue;
                                    break;
                                case "Crosses completed":
                                    playerTournament.CrossesCompleted = statValue;
                                    break;
                                case "Free-kicks taken":
                                    playerTournament.FreeKicksTaken = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Times in possession":
                                    playerTournament.TimesInPossession = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Clear chances":
                                    playerTournament.ClearChances = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Fouls committed":
                                    playerTournament.FoulsCommitted = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Fouls suffered":
                                    playerTournament.FoulsSuffered = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Offsides":
                                    playerTournament.Offsides = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Corners taken":
                                    playerTournament.CornersTaken = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Penalties scored":
                                    playerTournament.PenaltiesScored = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Penalties missed":
                                    playerTournament.PenaltiesMissed = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "Penalties awarded":
                                    playerTournament.PenaltiesAwarded = statValue != null ? int.Parse(statValue) : 0;
                                    break;
                                case "0":
                                case "1":
                                case "2":
                                case "3":
                                case "4":
                                case "5":
                                    break;
                                default:
                                    throw new Exception("Key not found: " + statName);
                            }
                        }

                        await unitOfWork.PlayerTournamentRepository.AddAsync(playerTournament, 1);
                        await unitOfWork.CompleteAsync();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error processing player file: " + player + " Error: " + ex.Message);
                        throw;
                    }


                }
            }
        }
    }
}
