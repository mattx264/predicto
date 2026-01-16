using HtmlAgilityPack;
using HtmlAgilityPack.CssSelectors.NetCore;
using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities.Sport;
using Predicto.Database.Entities.Sport.Enums;
using Predicto.Database.Interfaces;
using Predicto.Database.UnitOfWork;
using Predicto.DataCollector.Models;
using Predicto.DataCollector.Models.uefa;
using Predicto.DataCollector.Scraber;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;

namespace Predicto.DataCollector.Fifa
{
    public class UefaComChanpionship
    {
        string path = "C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\UefaClub\\";
        public UefaComChanpionship() { }
        public async Task SeedDataAsync(UnitOfWork unitOfWork)
        {
            //1.3
            //await TeamsDetailsSeedData(unitOfWork);
            //2.4
            //await PlayersDetailsSeedData(unitOfWork);
            //3.2
            await GameSeedDataAsync(unitOfWork);
        }
        public async Task Start()
        {
            //1
            // Teams(); // collect teams and save to list.json
            //2
            // await TeamsDetails();//open list.json and collect each team details and save to html and json
            //3 SeedData

            //1 players
            //await Players();//collect data for players from /squad url using script to go deep deep to collect img
            //2 
            // await PlayerOverView();
            //3
            //await PlayerStats();
            //4
            //Seed data

            //1 games
            //
            //2
            //await GameSeedDataAsync();

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

                    var json = JsonSerializer.Serialize(new UefaComTeamDetails
                    {
                        ImageSrcSet = srcset,
                        gamesWon = int.Parse(gamesWon),
                        gamesDraw = int.Parse(gamesDraw),
                        gamesLost = int.Parse(gamesLost),
                        totalGames = totalGames,
                        Id = GetIdFromHref(href)
                    });
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
            string[] fileEntries = Directory.GetFiles($"{path}", "*.html");
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
                    Slug = FifacomHelper.Slug(name),
                    FullName = fullName,
                    Code = doc.QuerySelector(".team-country-name").InnerText,
                    ImageUrl = data.ImageSrcSet,
                    Coach = "",
                    Type = TeamTypeEnum.Club,
                    UefaId = data.Id

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
                    Goals = int.TryParse(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Goals", "div[slot='stat-value']", 0), out var goalsValue) ? goalsValue : 0,
                    GoalsConceded = int.TryParse(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Goals conceded", "div[slot='stat-value']", 1), out var goalsConcededValue) ? goalsConcededValue : 0,
                    PossessionPercentage = double.TryParse(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Possession (%)", "div[slot='stat-value']", 2), out var PossessionPercentageValue) ? PossessionPercentageValue : 0,
                    PassingAccuracyPercentage = double.TryParse(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Passing accuracy (%)", "div[slot='stat-value']", 3), out var PassingAccuracyPercentageValue) ? PassingAccuracyPercentageValue : 0,
                    BallsRecovered = ConverToInt(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Balls recovered", "div[slot='stat-value']", 4)) ?? 0,
                    TacklesWon = ConverToInt(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Tackles won", "div[slot='stat-value']", 5)) ?? 0,
                    CleanSheets = ConverToInt(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Clean sheets", "div[slot='stat-value']", 6)) ?? 0,
                    Saves = ConverToInt(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Saves", "div[slot='stat-value']", 7)) ?? 0,
                    DistanceCoveredKm = ConverToDouble(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Distance covered (km)", "div[slot='stat-value']", 8)?.Replace("km", "")) ?? 0,
                    YellowCards = ConverToInt(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Yellow cards", "div[slot='stat-value']", 9)) ?? 0,
                    RedCards = ConverToInt(GetValueListByLable(doc, "pk-num-stat-item", "div[slot='stat-label']", "Red cards", "div[slot='stat-value']", 10)) ?? 0,
                };
                await unitOfWork.TournamentTeamRepository.AddAsync(tournamentTeamEntity, 1);
                await unitOfWork.CompleteAsync();
            }

        }
        public async Task Players()
        {

            //string[] fileEntries = Directory.GetFiles($"{path}", "*.html");
            var jsonText = await File.ReadAllTextAsync($"{path}list.json");
            //foreach (var file in fileEntries)
            //{
            var teams = JsonSerializer.Deserialize<List<UefaComTeam>>(jsonText);
            foreach (var team in teams)
            {
                var list = new List<UefaComTeam>();
                using var clubScraber = new BaseScraber<string>();
                clubScraber.StartChrome(team.Url + "squad/", 0);
                var links = clubScraber.GetElements("pk-table-body a");
                for (int i = 0; i < links.Count; i++)
                {
                    //var a =document.querySelectorAll('pk-table-body a pk-avatar')[0].shadowRoot.querySelector('img')
                    var script = $@"var list = []; document.querySelectorAll('pk-table-body a pk-avatar').forEach(x => {{
                            list.push(x.shadowRoot.querySelector('img'))
                        }}); return list[{i}];";
                    var img = clubScraber.GetElementsFromScript(script);
                    var srcset = img.GetAttribute("srcset");
                    var link = links[i].GetAttribute("href");
                    var name = links[i].GetAttribute("title").Replace("\r\n", "").Trim();
                    list.Add(new UefaComTeam
                    {
                        Url = link,
                        ImageSrcSet = srcset,
                        Name = name,
                        TeamName = team.Name.Split("(")[0].Trim()

                    });
                }

                var json = JsonSerializer.Serialize(list);
                var fileName = FifacomHelper.FileNameSanitizer(team.Name);
                File.WriteAllText($"{path}Players\\{fileName}.json", json, Encoding.UTF8);
            }
            // }
        }
        public async Task PlayerOverView()
        {

            string[] fileEntries = Directory.GetFiles($"{path}Players", "*.json");
            foreach (var file in fileEntries)
            {
                var jsonText = await File.ReadAllTextAsync(file);

                var squad = JsonSerializer.Deserialize<List<UefaComTeam>>(jsonText);
                foreach (var data in squad)
                {
                    try
                    {
                        var tempFileName = data.Name.Replace(" ", "-").ToLower();
                        if (File.Exists($"{path}Players\\Overview\\{tempFileName}.json"))
                        {
                            continue;
                        }
                        using var clubScraber = new BaseScraber<string>();
                        clubScraber.StartChrome(data.Url, 0);
                        var names = clubScraber.GetElements(".player-header__wrapper pk-identifier h2 span");
                        var firstName = names[0].Text;
                        var lastName = names[1].Text;

                        var fileName = FifacomHelper.FileNameSanitizer($"{firstName}-{lastName}");
                        var doc = new HtmlAgilityPack.HtmlDocument();
                        doc.LoadHtml(clubScraber.GetElement("body").GetAttribute("innerHTML"));
                        var position = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "Position", ".player-profile-value", 0);
                        var Clubnumber = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "Club number", ".player-profile-value", 1);
                        if (Clubnumber == null)
                        {
                            Clubnumber = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "Shirt number", ".player-profile-value", 1);

                        }
                        var NationalTeamnumber = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "National Team number", ".player-profile-value", 2);
                        var Countryofbirth = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "Country", ".player-profile-value", 3);
                        var Height = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "Height", ".player-profile-value", 5);
                        var Weight = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "Weight", ".player-profile-value", 6);
                        var DateofbirthInfo = GetValueListByLable(doc, ".player-profile-element", ".player-profile-category", "Date of birth", ".player-profile-value", 4).Split("(");
                        var Dateofbirth = DateOnly.ParseExact(DateofbirthInfo[0].Trim(), "d/M/yyyy", CultureInfo.InvariantCulture);
                        var age = int.Parse(DateofbirthInfo[1].Replace(")", ""));
                        if (string.IsNullOrEmpty(firstName))
                        {
                            var split = lastName.Split(" ");
                            if (split.Length == 2)
                            {
                                firstName = split[0];
                                lastName = split[1];
                            }
                            else if (split.Length == 1)
                            {
                                firstName = lastName;
                            }
                            else
                            {
                                firstName = split[0];
                                lastName = split[1] + " " + split[2];
                            }
                        }
                        var json = JsonSerializer.Serialize(new PlayerOverViewModel
                        {
                            FirstName = ToTitleCase(firstName),
                            LastName = ToTitleCase(lastName),
                            TeamName = data.TeamName,
                            Id = GetIdFromHref(data.Url),
                            Name = firstName + " " + lastName,
                            Slug = FifacomHelper.TeamNormalization(firstName + "-" + lastName),
                            Age = age,
                            Birthday = Dateofbirth,
                            BirthCountry = Countryofbirth,
                            ClubNumber = int.Parse(Clubnumber),
                            NationalTeamNumber = int.TryParse(NationalTeamnumber, out var nationalTeamNumberValue) ? nationalTeamNumberValue : (int?)null,
                            Position = position,
                            PhotoUrl = data.ImageSrcSet,
                            Height = Height != null ? Height.Split(" ")[0] : null,
                            Weight = Weight != null ? Weight.Split(" ")[0] : null,
                        });

                        File.WriteAllText($"{path}Players\\Overview\\{tempFileName}.json", json, Encoding.UTF8);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(data.Name);
                        throw;
                    }
                }
            }

        }
        public async Task PlayerStats()
        {

            string[] fileEntries = Directory.GetFiles($"{path}Players", "*.json");
            foreach (var file in fileEntries)
            {
                var jsonText = await File.ReadAllTextAsync(file);

                var squad = JsonSerializer.Deserialize<List<UefaComTeam>>(jsonText);
                foreach (var data in squad)
                {
                    try
                    {
                        var tempFileName = data.Name.Replace(" ", "-").ToLower();
                        if (File.Exists($"{path}Players\\Stats\\{tempFileName}.json"))
                        {
                            continue;
                        }
                        using var clubScraber = new BaseScraber<string>();
                        clubScraber.StartChrome(data.Url + "statistics/", 0);// <--- statistics page
                        var doc = new HtmlAgilityPack.HtmlDocument();
                        doc.LoadHtml(clubScraber.GetElement("body").GetAttribute("innerHTML"));
                        var MatchesPlayed = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Matches played", "div[slot='stat-value']", 0);
                        var Minutesplayed = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Minutes played", "div[slot='stat-value']", 0);
                        var Goals = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Goals", "div[slot='stat-value']", 0);
                        var Tackles = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Tackles", "div[slot='stat-value']", 0);
                        var BallsRecovered = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Balls recovered", "div[slot='stat-value']", 0);
                        var PassingAccuracy = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Passing accuracy (%)", "div[slot='stat-value']", 0);
                        var TopSpeed = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Top speed (km/h)", "div[slot='stat-value']");
                        var DistanceCovered = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Distance covered (km)", "div[slot='stat-value']");
                        var YellowCards = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Yellow cards", "div[slot='stat-value']");
                        var RedCards = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Red cards", "div[slot='stat-value']");
                        var Blocks = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Blocks", "div[slot='stat-value']");
                        var OwnGoalsConceded = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Own goals conceded", "div[slot='stat-value']");
                        var PenaltiesAwarded = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Penalties awarded", "div[slot='stat-value']");
                        var PassesCompleted = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Passes completed", "div[slot='stat-value']");
                        var Assists = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Assists", "div[slot='stat-value']");
                        var AttemptsConcededOnTarget = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Attempts conceded on target", "div[slot='stat-value']");
                        var Cleansheets = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Clean sheets", "div[slot='stat-value']");
                        var ClearChances = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Clear chances", "div[slot='stat-value']");
                        var CornersTaken = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Corners taken", "div[slot='stat-value']");
                        var CrossesCompleted = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Crosses completed", "div[slot='stat-value']");
                        var CrossingAccuracy = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Crossing accuracy (%)", "div[slot='stat-value']");
                        var FoulsCommitted = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Fouls committed", "div[slot='stat-value']");
                        var FoulsSuffered = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Fouls suffered", "div[slot='stat-value']");
                        var FreeKicksTaken = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Free-kicks taken", "div[slot='stat-value']");
                        var Offsides = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Offsides", "div[slot='stat-value']");
                        var PenaltiesConceded = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Penalties conceded", "div[slot='stat-value']");
                        var PenaltiesMissed = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Penalties missed", "div[slot='stat-value']");
                        var PenaltiesScored = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Penalties scored", "div[slot='stat-value']");
                        var TimesInPossession = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Times in possession", "div[slot='stat-value']");
                        var Saves = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Saves", "div[slot='stat-value']");
                        var TotalAttempts = GetValueListByLable(doc, ".player-page .stats-module__single-stat", "div[slot='stat-label']", "Total attempts", "div[slot='stat-value']");

                        var names = clubScraber.GetElements(".player-header__wrapper pk-identifier h2 span");
                        var firstName = names[0].Text;
                        var lastName = names[1].Text;
                        if (string.IsNullOrEmpty(firstName))
                        {
                            var split = lastName.Split(" ");
                            if (split.Length == 2)
                            {
                                firstName = split[0];
                                lastName = split[1];
                            }
                            else if (split.Length == 1)
                            {
                                firstName = lastName;
                            }
                            else
                            {
                                firstName = split[0];
                                lastName = split[1] + " " + split[2];
                            }
                        }
                        var json = JsonSerializer.Serialize(new PlayerStatsModel
                        {
                            FirstName = ToTitleCase(firstName),
                            LastName = ToTitleCase(lastName),
                            TeamName = data.TeamName,
                            Id = GetIdFromHref(data.Url),
                            Url = data.Url,
                            MatchesPlayed = ConverToInt(MatchesPlayed) ?? 0,
                            Minutesplayed = ConverToInt(Minutesplayed) ?? 0,
                            Goals = ConverToInt(Goals) ?? 0,
                            Tackles = ConverToInt(Tackles),
                            BallsRecovered = ConverToInt(BallsRecovered),
                            PassingAccuracy = ConverToDouble(PassingAccuracy),
                            TopSpeed = ConverToDouble(TopSpeed),//Top speed (km/h)
                            DistanceCovered = ConverToDouble(DistanceCovered),//Distance covered (km)
                            YellowCards = ConverToInt(YellowCards) ?? 0,//Yellow cards
                            RedCards = ConverToInt(RedCards) ?? 0,//Red cards
                            Blocks = ConverToInt(Blocks),//Blocks
                            OwnGoalsConceded = ConverToInt(OwnGoalsConceded),//Own goals conceded
                            PenaltiesAwarded = ConverToInt(PenaltiesAwarded),//Penalties awarded
                            PassesCompleted = PassesCompleted,//Passes completed
                            Assists = ConverToInt(Assists),//Assists
                            AttemptsConcededOnTarget = ConverToInt(AttemptsConcededOnTarget),//Attempts conceded on target
                            Cleansheets = ConverToInt(Cleansheets),//Clean sheets
                            ClearChances = ConverToInt(ClearChances),//Clear chances
                            CornersTaken = ConverToInt(CornersTaken),//Corners taken
                            CrossesCompleted = CrossesCompleted,//Crosses completed
                            CrossingAccuracy = ConverToDouble(CrossingAccuracy),//Crossing accuracy (%)
                            FoulsCommitted = ConverToInt(FoulsCommitted),//Fouls committed
                            FoulsSuffered = ConverToInt(FoulsSuffered),//Fouls suffered
                            FreeKicksTaken = ConverToInt(FreeKicksTaken),//Free-kicks taken
                            Offsides = ConverToInt(Offsides),//Offsides
                            PenaltiesConceded = ConverToInt(PenaltiesConceded),//Penalties conceded
                            PenaltiesMissed = ConverToInt(PenaltiesMissed),//Penalties missed
                            PenaltiesScored = ConverToInt(PenaltiesScored),//Penalties scored
                            TimesInPossession = ConverToInt(TimesInPossession),//Times in possession
                            Saves = ConverToInt(Saves),//Saves
                            TotalAttempts = ConverToInt(TotalAttempts),//Total attempts
                        });


                        File.WriteAllText($"{path}Players\\Stats\\{tempFileName}.json", json, Encoding.UTF8);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(data.Name);
                        throw;
                    }
                }
            }
        }
        public async Task PlayersDetailsSeedData(UnitOfWork unitOfWork)
        {
            var chapionsLeague = await unitOfWork.Tournament.FindAsync(t => t.Name == "Champions League");

            string[] fileEntries = Directory.GetFiles($"{path}Players\\Overview", "*.json");
            var teams = await unitOfWork.Team.GetAllAsync();
            var players = await unitOfWork.Player.GetAllAsync();
            for (int i = fileEntries.Length - 1; i > 0; i--)
            {
                // foreach (var file in fileEntries)
                // {
                var file = fileEntries[i];
                var jsonText = await File.ReadAllTextAsync(file);
                var playerDataOverview = JsonSerializer.Deserialize<PlayerOverViewModel>(jsonText);
                var jsonTextStats = await File.ReadAllTextAsync(file.Replace("Overview", "Stats"));
                var playerDataStats = JsonSerializer.Deserialize<PlayerStatsModel>(jsonTextStats);
                var uefaId = GetIdFromHref(playerDataStats?.Url);
                var checkPlayer = players.FirstOrDefault(x => x.UefaId == uefaId);
                if (checkPlayer != null)
                {
                    continue;
                }
                var teamName = FifacomHelper.TeamNormalization(playerDataOverview.TeamName).ToLower();
                var team = teams.FirstOrDefault(t => t.Name.ToLower() == teamName);
                if (team == null)
                {
                    throw new Exception("Team not found: " + teamName);
                }

                await SavePlayer(unitOfWork, uefaId, chapionsLeague, team, playerDataOverview, playerDataStats);

            }
        }
        private async Task SavePlayer(UnitOfWork unitOfWork, string uefaId, TournamentEntity chapionsLeague, TeamEntity team, PlayerOverViewModel playerDataOverview, PlayerStatsModel playerDataStats, int slugIndex = 0)
        {

            PlayerEntity playerEntity = null;
            TeamPlayerEntity teamPlayerEntity = null;
            PlayerTournamentEntity tournamentTeamEntity = null;
            try
            {


                playerEntity = new PlayerEntity()
                {
                    FirstName = playerDataOverview.FirstName,
                    LastName = playerDataOverview.LastName,
                    Name = playerDataOverview.Name,
                    Slug = slugIndex == 0 ? FifacomHelper.Slug(playerDataOverview.Slug) : FifacomHelper.Slug(playerDataOverview.Slug) + "-" + slugIndex.ToString(),
                    Age = playerDataOverview.Age,
                    Birthday = playerDataOverview.Birthday,
                    BirthCountry = playerDataOverview.BirthCountry,
                    ClubNumber = playerDataOverview.ClubNumber,
                    NationalTeamNumber = playerDataOverview.NationalTeamNumber,
                    Position = playerDataOverview.Position,
                    PhotoUrl = playerDataOverview.PhotoUrl,
                    UefaId = uefaId,
                    Height = ConverToInt(playerDataOverview.Height),
                    Weight = ConverToInt(playerDataOverview.Weight)
                };
                await unitOfWork.Player.AddAsync(playerEntity, 1);

                teamPlayerEntity = new TeamPlayerEntity()
                {
                    PlayerEntity = playerEntity,
                    TeamEntity = team,

                };
                await unitOfWork.TeamPlayerRepository.AddAsync(teamPlayerEntity, 1);

                tournamentTeamEntity = new PlayerTournamentEntity()
                {
                    Player = playerEntity,
                    Tournament = chapionsLeague,
                    MatchesPlayed = playerDataStats.MatchesPlayed,
                    Minutesplayed = playerDataStats.Minutesplayed,
                    Goals = playerDataStats.Goals,
                    Tackles = playerDataStats.Tackles,
                    BallsRecovered = playerDataStats.BallsRecovered,
                    PassingAccuracy = playerDataStats.PassingAccuracy,
                    TopSpeed = playerDataStats.TopSpeed,//Top speed (km/h)
                    DistanceCovered = playerDataStats.DistanceCovered,//Distance covered (km)
                    YellowCards = playerDataStats.YellowCards,//Yellow cards
                    RedCards = playerDataStats.RedCards,//Red cards
                    Blocks = playerDataStats.Blocks,//Blocks
                    OwnGoalsConceded = playerDataStats.OwnGoalsConceded,//Own goals conceded
                    PenaltiesAwarded = playerDataStats.PenaltiesAwarded,//Penalties awarded
                    PassesCompleted = playerDataStats.PassesCompleted,//Passes completed
                    Assists = playerDataStats.Assists,//Assists
                    AttemptsConcededOnTarget = playerDataStats.AttemptsConcededOnTarget,//Attempts conceded on target
                    Cleansheets = playerDataStats.Cleansheets,//Clean sheets
                                                              //ClearancesAttempted
                    ClearChances = playerDataStats.ClearChances,//Clear chances
                    CornersTaken = playerDataStats.CornersTaken,//Corners taken
                    CrossesCompleted = playerDataStats.CrossesCompleted,//Crosses completed
                    CrossingAccuracy = playerDataStats.CrossingAccuracy,//Crossing accuracy (%)
                    FoulsCommitted = playerDataStats.FoulsCommitted,//Fouls committed
                    FoulsSuffered = playerDataStats.FoulsSuffered,//Fouls suffered
                    FreeKicksTaken = playerDataStats.FreeKicksTaken,//Free-kicks taken
                    Offsides = playerDataStats.Offsides,//Offsides
                    PenaltiesConceded = playerDataStats.PenaltiesConceded,//Penalties conceded
                    PenaltiesMissed = playerDataStats.PenaltiesMissed,//Penalties missed
                    PenaltiesScored = playerDataStats.PenaltiesScored,//Penalties scored
                    TimesInPossession = playerDataStats.TimesInPossession,//Times in possession
                    Saves = playerDataStats.Saves,//Saves
                    TotalAttempts = playerDataStats.TotalAttempts,//Total attempts
                };
                await unitOfWork.PlayerTournamentRepository.AddAsync(tournamentTeamEntity, 1);
                await unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message;
                if (message != null && message.Contains("Cannot insert duplicate key row in object 'dbo.Player'"))
                {

                    //It will contains two entities one with old slug and one with new slug and it will cause duplicate key error 
                    //So we need to retry with new slug but removing the old entity from context first
                    //unitOfWork._context.ChangeTracker.Clear();
                    unitOfWork._context.Entry(playerEntity).State = EntityState.Detached;
                    unitOfWork._context.Entry(teamPlayerEntity).State = EntityState.Detached;
                    unitOfWork._context.Entry(tournamentTeamEntity).State = EntityState.Detached;


                    // unitOfWork.Player.
                    await SavePlayer(unitOfWork, uefaId, chapionsLeague, team, playerDataOverview, playerDataStats, ++slugIndex);
                }
            }
        }
        public async Task Games()
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

        public async Task GameSeedDataAsync(UnitOfWork unitOfWork)
        {
            var chapionsLeague = await unitOfWork.Tournament.FindAsync(t => t.Name == "Champions League");
            if (chapionsLeague == null)
            {
                throw new Exception("Tournament not found: Champions League");
            }
            //RestClient _restClient = new RestClient();
            //var gamesJson = await _restClient.GetAsync("https://match.uefa.com/v5/matches?competitionId=1&fromDate=2025-09-16&limit=30&offset=0&order=ASC&phase=ALL&seasonYear=2026&toDate=2025-09-16&utcOffset=-6");
            //var games = JsonSerializer.Deserialize<List<UefaGameModel>>(gamesJson);
            //   var gamesJson = await File.ReadAllTextAsync($"{path}Games\\2026-01-20.json");
            var gamesJson = await File.ReadAllTextAsync($"{path}Games\\2025-09-16.json");

            var games = JsonSerializer.Deserialize<List<UefaGameModel>>(gamesJson);
            foreach (var game in games)
            {
                var checkGame = await unitOfWork.Game.FindAsync(x => x.UefaId == game.id);
                if (checkGame != null)
                {
                    if (game.status == "UPCOMING" && checkGame.FinalScore == null)
                    {
                        continue;
                    }
                }
                var gamePlayers = new List<GamePlayerEntity>();
                var gamePlayerEvents = new List<GamePlayerEventEntity>();
                var gameScoreEvents = new List<GameScoreEntity>();
                if (game.playerEvents != null)
                {
                    game.playerEvents.scorers.ForEach(se =>
                    {

                        var scorerTeam = se.teamId == game.homeTeam.id ? "home" : "away";
                        var gameScoreEntity = new GameScoreEntity()
                        {
                            Phase = se.phase,
                            PlayerId = se.player.id,
                            // TeamId = se.teamId,
                            //Score =,
                            TimeScored = se.time.minute + ":" + se.time.second,
                        };

                        gameScoreEvents.Add(gameScoreEntity);
                    });
                    var stadium = await unitOfWork.GameStadium.FindAsync(x => x.UefaId == game.stadium.id);
                    if (stadium == null)
                    {
                        stadium = new GameStadiumEntity()
                        {
                            StadiumName = game.stadium.translations.name.EN,
                            StadiumNameCityName = game.stadium.city.translations.name.EN,
                            Address = game.stadium.address,
                            Capacity = game.stadium.capacity,
                            ImageUrl = game.stadium.images.MEDIUM_WIDE,
                            UefaId = game.stadium.id,
                            IsActive = true
                        };
                    }
                    var teams = new List<GameTeamEntity>();
                    var home = await unitOfWork.Team.FindAsync(x => x.UefaId == game.homeTeam.id);
                    if (home == null)
                    {
                        throw new Exception("Team not found by id: " + game.homeTeam.id);
                    }
                    var away = await unitOfWork.Team.FindAsync(x => x.UefaId == game.awayTeam.id);
                    if (away == null)
                    {
                        throw new Exception("Team not found by id: " + game.awayTeam.id);
                    }
                    teams.Add(new GameTeamEntity()
                    {
                        Tactics = null,
                        Team = home,
                        IsActive = true
                    });
                    teams.Add(new GameTeamEntity()
                    {
                        Tactics = null,
                        Team = away,
                        IsActive = true
                    });
                    string? score = null;
                    if (game.score != null)
                    {
                        score = $"{game.score.total.home}: {game.score.total.away}";
                    }
                    var gameEntity = new GameEntity()
                    {
                        // GamePlayers = gamePlayers,
                        // GamePlayerEvents = gamePlayerEvents,
                        GameScoreEvents = gameScoreEvents,
                        Referee = game.referees.First(x => x.role == "UEFA_DELEGATE").person.translations.name.EN,
                        Stadium = stadium,
                        StartGame = game.kickOffTime.dateTime,
                        UefaId = game.id,
                        FinalScore = score,
                        Tournament = chapionsLeague,
                        Teams = teams,
                        PlayerOfTheMatchId = game.playerOfTheMatch != null ? game.playerOfTheMatch.player.id : null,

                    };
                    await unitOfWork.Game.AddAsync(gameEntity, 1);
                    await unitOfWork.CompleteAsync();
                }

                //File.WriteAllText("countries.json", countries, Encoding.gamesJson);

                //    string[] fileEntries = Directory.GetFiles($"{path}Games", "*.json");
                //        foreach (var file in fileEntries)
                //        {
                //            var jsonText = await File.ReadAllTextAsync(file);

                //    var games = JsonSerializer.Deserialize<List<dynamic>>(jsonText);
                //}

            }
        }

        private string? GetValueListByLable(HtmlDocument doc, string listSelector, string labelSelector, string labelName, string valueSelector, int? praboblyIndex = null)
        {
            try
            {
                var elements = doc.QuerySelectorAll(listSelector);
                if (praboblyIndex != null && elements.Count > praboblyIndex.Value)
                {
                    var ele = elements[praboblyIndex.Value];
                    var lab = ele.QuerySelector(labelSelector);
                    if (lab.InnerText == labelName)
                    {
                        var val = ele.QuerySelector(valueSelector);
                        return val.InnerText.Replace("%", "");
                    }
                }
                foreach (var item in elements)
                {
                    var lab = item.QuerySelector(labelSelector);
                    if (lab != null && lab.InnerText == labelName)
                    {
                        var val = item.QuerySelector(valueSelector);
                        return val.InnerText.Replace("%", "");
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro with");
                throw;
            }
        }
        private string ToTitleCase(string str)
        {
            var firstword = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(str.Split(' ')[0].ToLower());
            str = str.Replace(str.Split(' ')[0], firstword);
            return str;
        }
        private int? ConverToInt(string? value)
        {
            if (int.TryParse(value, out var intValue))
            {
                return intValue;
            }
            return null;
        }
        private double? ConverToDouble(string? value)
        {
            if (double.TryParse(value, out var doubleValue))
            {
                return doubleValue;
            }
            return null;
        }
        private string GetIdFromHref(string href)
        {
            //https://www.uefa.com/uefachampionsleague/clubs/50062--psv/
            href = href.TrimEnd('/');
            var parts = href.Split('/');
            return parts.Last().Split("--").First();
        }

        private class PlayerStatsModel
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string TeamName { get; set; }
            public string Id { get; set; }
            public string Url { get; set; }
            public int MatchesPlayed { get; set; }
            public int Minutesplayed { get; set; }
            public int Goals { get; set; }
            public int? Tackles { get; set; }
            public int? BallsRecovered { get; set; }
            public double? PassingAccuracy { get; set; }
            public double? TopSpeed { get; set; }
            public double? DistanceCovered { get; set; }
            public int YellowCards { get; set; }
            public int RedCards { get; set; }
            public int? Blocks { get; set; }
            public int? OwnGoalsConceded { get; set; }
            public int? PenaltiesAwarded { get; set; }
            public string PassesCompleted { get; set; }
            public int? Assists { get; set; }
            public int? AttemptsConcededOnTarget { get; set; }
            public int? Cleansheets { get; set; }
            public int? ClearChances { get; set; }
            public int? CornersTaken { get; set; }
            public string CrossesCompleted { get; set; }
            public double? CrossingAccuracy { get; set; }
            public int? FoulsCommitted { get; set; }
            public int? FoulsSuffered { get; set; }
            public int? FreeKicksTaken { get; set; }
            public int? Offsides { get; set; }
            public int? PenaltiesConceded { get; set; }
            public int? PenaltiesMissed { get; set; }
            public int? PenaltiesScored { get; set; }
            public int? TimesInPossession { get; set; }
            public int? Saves { get; set; }
            public int? TotalAttempts { get; set; }
        }

        private class PlayerOverViewModel
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string TeamName { get; set; }
            public string Id { get; set; }
            public string Name { get; set; }
            public string Slug { get; set; }
            public int Age { get; set; }
            public DateOnly Birthday { get; set; }
            public string BirthCountry { get; set; }
            public int ClubNumber { get; set; }
            public int? NationalTeamNumber { get; set; }
            public string Position { get; set; }
            public string PhotoUrl { get; set; }
            public string Height { get; set; }
            public string Weight { get; set; }
        }
    }

}
