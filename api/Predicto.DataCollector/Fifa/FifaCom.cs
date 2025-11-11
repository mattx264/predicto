using Predicto.Database.Entities.Sport;
using Predicto.Database.UnitOfWork;
using Predicto.DataCollector.Scraber;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace Predicto.DataCollector.Fifa
{
    public class FifaCom
    {
        string dataPath = "C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\Fifacom\\Games\\";
        public FifaCom() { }
        public async Task Start()
        {
            var rest = new RestClient();

            using var scraber = new BaseScraber<string>();
            scraber.StartChrome("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/qualifiers/uefa/scores-fixtures?country=PL&wtw-filter=ALL", 10000);
            var elements = scraber.GetElements(".grid-container-custom .row a");
            //var list = new List<string>();
            //foreach (var element in elements) {
            //    list.Add(element.GetAttribute("href"));
            //}
            //File.WriteAllText("C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\Fifacom\\fifa_links.json", JsonSerializer.Serialize(list));
            foreach (var page in elements)
            {
                var url = page.GetAttribute("href");
                var parts = url.Split('/');

                //https://www.fifa.com/en/match-centre/match/520/288329/288330/400019331
                //https://api.fifa.com/api/v3/live/football/520/288329/288330/400019338?language=en 
                if (File.Exists($"{dataPath}{parts[9]}.json"))
                {
                    continue;
                }
                try
                {
                    var response = await rest.GetAsync($"https://api.fifa.com/api/v3/live/football/{parts[6]}/{parts[7]}/{parts[8]}/{parts[9]}?language=en");
                    File.WriteAllText($"{dataPath}{parts[9]}.json", response, Encoding.UTF8);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    continue;
                }

            }
            //   rest.

            //        File.WriteAllText(File.Exists("test.txt") ? "test.txt" : "test.txt", JsonSerializer.Serialize(data));

        }
        internal async Task SeedData(UnitOfWork unitOfWork)
        {
            //try
            //{
            //    await new FifacomGroup().SeedData(unitOfWork);
            //}
            //catch (Exception)
            //{
            //    throw;
            //}
            try
            {
                var teams = unitOfWork.Team.GetAllAsync().Result;

                var existingsGames = await unitOfWork.Game.GetAllAsync();
                var players = await unitOfWork.Player.GetAllAsync();

                var jsonFiles = Directory.GetFiles(dataPath, "*.json");
                foreach (var jsonFile in jsonFiles)
                {
                    try
                    {
                        var jsonData = File.ReadAllText(jsonFile);
                        var gameData = JsonSerializer.Deserialize<FifaComGameModel>(jsonData);
                        var teamHomeName = FifacomHelper.TeamNormalization(gameData.HomeTeam.TeamName[0].Description);
                        var teamAwayName = FifacomHelper.TeamNormalization(gameData.AwayTeam.TeamName[0].Description);

                        var teamHome = teams.First(t => t.Name == teamHomeName);
                        var teamAway = teams.First(t => t.Name == teamAwayName);

                        if (
                            existingsGames.Any(g => g.Teams.First().TeamId == teamHome.Id
                        && g.Teams.Last().TeamId==teamAway.Id
                        && g.StartGame == gameData.Date
                                        ))
                        {
                            continue;
                        }

                        var gamePlayerEvents = new List<GamePlayerEventEntity>();

                        var gamePlayer = new List<GamePlayerEntity>();
                        var playersLocal = new Dictionary<int, string>();
                        await SeedPlayers(gameData.AwayTeam.Players, unitOfWork, gamePlayer, teamAway);
                        await SeedPlayers(gameData.HomeTeam.Players, unitOfWork, gamePlayer, teamHome);

                        await SeedGoal(gameData.HomeTeam.Goals, gamePlayerEvents, unitOfWork);
                        await SeedGoal(gameData.AwayTeam.Goals, gamePlayerEvents, unitOfWork);

                        await SeedCard(gameData.AwayTeam.Bookings, gamePlayerEvents, unitOfWork);
                        await SeedCard(gameData.HomeTeam.Bookings, gamePlayerEvents, unitOfWork);

                        await SeedSubstitutions(gameData.AwayTeam.Substitutions, gamePlayerEvents, unitOfWork);
                        await SeedSubstitutions(gameData.HomeTeam.Substitutions, gamePlayerEvents, unitOfWork);

                        teamAway.Coach = gameData.AwayTeam.Coaches.First().Name.First().Description;
                        teamHome.Coach = gameData.HomeTeam.Coaches.First().Name.First().Description;
                        var homeTeam = new GameTeamEntity
                        {
                            TeamId = teamHome.Id,
                            Tactics = gameData.HomeTeam.Tactics

                        };
                        var awayTeam = new GameTeamEntity
                        {
                            TeamId = teamAway.Id,
                            Tactics = gameData.AwayTeam.Tactics
                        };
                        var teamsEntity = new List<GameTeamEntity> { homeTeam, awayTeam };
                        var stadium = (GameStadiumEntity?)null;
                        if (gameData.Stadium != null && gameData.Stadium.Name[0] != null)
                        {
                            var stadiumName = gameData.Stadium.Name[0].Description;
                            stadium = await unitOfWork.GameStadium.FindAsync(x => x.StadiumName == stadiumName);
                            if (stadium == null)
                            {
                                stadium = new GameStadiumEntity
                                {
                                    StadiumName = stadiumName,
                                    StadiumNameCityName = gameData.Stadium.CityName[0].Description,
                                };
                            }

                        }
                        var gameEntity = new GameEntity
                        {
                            TournamentId = 1,// FIFA World Cup Qualifiers
                            Teams = teamsEntity,
                            FinalScore = gameData.HomeTeam.Score == null ? null : $"{gameData.HomeTeam.Score}-{gameData.AwayTeam.Score}",
                            StartGame = gameData.Date,
                            IsActive = true,
                            Referee = gameData.Officials == null || gameData.Officials.Count == 0 ? null : gameData.Officials[0].Name[0].Description,
                            GamePlayers = gamePlayer,
                            GamePlayerEvents = gamePlayerEvents,
                            Stadium = stadium
                        };
                        await unitOfWork.Game.AddAsync(gameEntity);
                        await unitOfWork.CompleteAsync();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error processing file {jsonFile}: {ex.Message}");
                        continue;
                    }
                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        private async Task SeedSubstitutions(List<Substitution> substitutions, List<GamePlayerEventEntity> gamePlayerEvents, UnitOfWork unitOfWork)
        {
            foreach (var item in substitutions)
            {
                var playeroff = await unitOfWork.Player.FindAsync(x => x.FifaId == int.Parse(item.IdPlayerOff));
                if (playeroff == null)
                {
                    Console.WriteLine($"Player not found for substitution off: {item.IdPlayerOff}");
                    continue;
                }
                int idoff = playeroff.Id;

                var playeron = await unitOfWork.Player.FindAsync(x => x.FifaId == int.Parse(item.IdPlayerOn));
                if (playeron == null)
                {
                    Console.WriteLine($"Player not found for substitution on: {item.IdPlayerOn}");
                    continue;
                }
                int idon = playeron.Id;
                gamePlayerEvents.Add(new GamePlayerEventEntity()
                {
                    GamePlayerEvent = GamePlayerEvent.SubstitutionIn,
                    Minute = getMinute(item.Minute),
                    PlayerId = idon,

                });
                gamePlayerEvents.Add(new GamePlayerEventEntity()
                {
                    GamePlayerEvent = GamePlayerEvent.SubstitutionOut,
                    Minute = getMinute(item.Minute),
                    PlayerId = idoff,

                });
            }
        }

        private int getMinute(string minute)
        {
            if (minute == null)
                return 0;
            if (minute.Contains("+"))
            {
                var parts = minute.Split("+");
                return int.Parse(parts[0].Replace("'", "")) + int.Parse(parts[1].Replace("'", ""));
            }
            return int.Parse(minute.Replace("'", ""));

        }

        private async Task SeedCard(List<Booking> bookings, List<GamePlayerEventEntity> gamePlayerEvents, UnitOfWork unitOfWork)
        {
            foreach (var item in bookings)
            {
                try
                {
                    if (item.IdPlayer == null)
                    {
                        continue;
                    }
                    //todo handle cache   item.IdCoach

                    var player = await unitOfWork.Player.FindAsync(x => x.FifaId == int.Parse(item.IdPlayer));
                    if (player == null)
                    {
                        Console.WriteLine($"Player not found for card: {item.IdPlayer}");
                        continue;
                    }
                    int id = player.Id;

                    gamePlayerEvents.Add(new GamePlayerEventEntity()
                    {
                        GamePlayerEvent = item.Card == 1 ? GamePlayerEvent.YellowCard : GamePlayerEvent.RedCard,
                        Minute = getMinute(item.Minute),
                        PlayerId = id,

                    });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Player not found for card: {item.IdPlayer}");
                    throw;
                }
            }
        }

        private async Task SeedGoal(List<Goal> goals, List<GamePlayerEventEntity> gamePlayerEvents, UnitOfWork unitOfWork)
        {
            foreach (var item in goals)
            {
                var player = await unitOfWork.Player.FindAsync(x => x.FifaId == int.Parse(item.IdPlayer));
                if (player == null)
                {
                    Console.WriteLine($"Player not found: {item.IdPlayer}");
                    continue;
                }
                int id = player.Id;
                gamePlayerEvents.Add(new GamePlayerEventEntity()
                {
                    GamePlayerEvent = GamePlayerEvent.Goal,
                    Minute = getMinute(item.Minute),
                    PlayerId = id,

                });
            }
        }

        private async Task SeedPlayers(List<Player> players, UnitOfWork unitOfWork, List<GamePlayerEntity> gamePlayer, TeamEntity teamEntity)
        {
            try
            {
                foreach (var item in players)
                {

                    var player = await FindPlayerByLastName(unitOfWork, item, int.Parse(item.IdPlayer), teamEntity);
                    if (player == null)
                    {
                        Console.WriteLine($"Player not found: {item.ShortName[0].Description}");
                    }
                    gamePlayer.Add(new GamePlayerEntity()
                    {
                        PlayerId = player.Id,
                        Position = item.Position,
                        IsCaptain = item.Captain,
                    });
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        private async Task<PlayerEntity> FindPlayerByLastName(UnitOfWork unitOfWork, Player playerEntity, int id, TeamEntity teamEntity)
        {
            var names = playerEntity.ShortName[0].Description.Split(" ");
            var lastName = names[names.Length - 1];
            var player = await unitOfWork.Player.FindAsync(x => x.FifaId == id);
            if (player != null)
            {
                return player;
            }
            player = await unitOfWork.Player.FindAsync(
                   p => p.LastName.ToLower() == lastName.ToLower()
                 && p.Teams.Contains(teamEntity)
                 );
            if (player == null)
            {
                var replacedLastName = FifacomHelper.ReplaceSpecialCharacters(lastName);
                player = await unitOfWork.Player.FindAsync(
                   p => FifacomHelper.ReplaceSpecialCharacters(p.LastName.ToLower()) == replacedLastName.ToLower()
                 && p.Teams.Contains(teamEntity)
                 );
                if (player == null)
                {
                    player = new PlayerEntity
                    {
                        FirstName = string.Join(" ", names, 0, names.Length - 1),
                        LastName = lastName,
                        Name = playerEntity.ShortName[0].Description,
                        Slug = (string.Join(" ", names, 0, names.Length - 1) + "-" + lastName).ToLower().Replace(" ", "-").Replace(".", ""),
                        FifaId = id,
                        BirthCountry = null,
                        Height = null,
                        Weight = null,
                        Nationality = null,
                        IsActive = true,
                        Teams = new List<TeamEntity> { teamEntity }
                    };
                    await unitOfWork.Player.AddAsync(player);
                    await unitOfWork.CompleteAsync();
                    return player;
                    //  throw new Exception($"Player with last name {lastName} not found in team {teamEntity.Name}");
                }//  return await FindPlayerByLastName(unitOfWork, lastName.Substring(1, lastName.Length - 2), id, teamEntity);
            }
            player.FifaId = id;
            return player;
        }
    }
}
