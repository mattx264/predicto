using HtmlAgilityPack.CssSelectors.NetCore;
using Predicto.Database.UnitOfWork;
using Predicto.DataCollector.Scraber;
using Predicto.Gateway.DTO.Sport;
using System.Text;

namespace Predicto.DataCollector.Fifa
{
    public class UefaCom
    {
        string path = "C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\Uefa\\";
        public UefaCom() { }
        public void Start()
        {
            Player();
            return;
            using var scraber = new BaseScraber<string>();
            scraber.StartChrome("https://www.uefa.com/european-qualifiers/teams", 0);
            var elements = scraber.GetElements(".teams-overview_teams-wrapper a");
            foreach (var element in elements)
            {
                ///european-qualifiers/teams/2--albania/
                var url = element.GetAttribute("href");
                var name = url.Split("--")[1];
                name = name.Replace("/", "");
                using var subPage = new BaseScraber<string>();
                subPage.StartChrome(url + "squad", 0);
                var body = subPage.GetElement(".body");
                if (body == null)
                {
                    throw new Exception("body is null");
                }
                File.WriteAllText($"{path}{name}.html", body.GetAttribute("innerHTML"), Encoding.UTF8);

            }
        }
        public void Player()
        {
            string[] fileEntries = Directory.GetFiles($"{path}");
            foreach (var file in fileEntries)
            {
                var html = File.ReadAllText(file);
                var doc = new HtmlAgilityPack.HtmlDocument();
                doc.LoadHtml(html);
                var playerElements = doc.QuerySelectorAll(".pk-col--content a");
                if (playerElements != null)
                {
                    var name = Path.GetFileNameWithoutExtension(file);
                    var folderPath = $"{path}Players\\{name}\\";
                    Directory.CreateDirectory(folderPath);
                    foreach (var playerElement in playerElements)
                    {
                        var playerName = playerElement.InnerText.Replace("\r\n", "").Replace(" ", "").Replace("\t","");
                        if (File.Exists($"{folderPath}{playerName}.html"))
                        {
                            continue;
                        }
                        var url = "https://www.uefa.com" + playerElement.GetAttributes("href").ElementAt(0).Value;
                        if (url.IndexOf("/players/") == -1)
                        {
                            continue;
                        }
                        using var subPage = new BaseScraber<string>();

                        subPage.StartChrome(url, 0);
                        var body = subPage.GetElement(".body");


                        if (body == null)
                        {
                            throw new Exception("body is null");
                        }

                        File.WriteAllText($"{folderPath}{playerName}.html", body.GetAttribute("innerHTML"), Encoding.UTF8);
                    }
                }
            }
        }
        public void OpenSubPage()
        {
            using var subPage = new BaseScraber<string>();
            subPage.StartChrome("https://www.uefa.com/european-qualifiers/teams/2--albania/squad", 0);
            var body = subPage.GetElement(".body");
            if (body == null)
            {
                throw new Exception("body is null");
            }
            Console.Write(body.GetAttribute("innerHTML"));
            File.WriteAllText($"C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\Uefa\\2--albania.html", body.GetAttribute("innerHTML"), Encoding.UTF8);
        }
        internal async Task SeedTeamAsync(UnitOfWork unitOfWork)
        {

            string[] fileEntries = Directory.GetFiles($"{path}");
            foreach (var file in fileEntries)
            {
                var html = File.ReadAllText(file);
                var doc = new HtmlAgilityPack.HtmlDocument();
                doc.LoadHtml(html);
                var name = doc.QuerySelector(".team-name").InnerText;
                var team = new TeamEntity()
                {
                    Name = name,
                    Slug = name.Replace(" ", ""),
                    Coach = doc.QuerySelectorAll("[column-key='coach'] span")[2].InnerText.Trim(),
                    Code = "",
                    FormLastGames = doc.QuerySelectorAll("#accordion-item-0 pk-accordion-item-title div")[1].InnerText,
                    ImageUrl = ""
                };
                await unitOfWork.Team.AddAsync(team);
            }
        }

        internal void SeedData(UnitOfWork unitOfWork)
        {

            string[] fileEntries = Directory.GetDirectories($"{path}/Players");
            foreach (var file in fileEntries)
            {
                foreach (var player in Directory.GetFiles(file))
                {

                    var html = File.ReadAllText(player);
                    var doc = new HtmlAgilityPack.HtmlDocument();
                    doc.LoadHtml(html);
                    var name = doc.QuerySelector("h2[slot]").InnerText.Trim().Replace(" ", "").Replace("\r\n", " ").Split(" ");

                    var db = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[5]/pk-identifier/span[2]").InnerText;
                    var dbDate = db.Split("(")[0];
                    var age= db.Split("(")[1].Replace("(","").Replace(")","");
                    DateTime.Parse(dbDate);
                   var dbPlace= doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[4]/pk-identifier/span[2]").InnerText;
                    var height = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[6]/pk-identifier/span[2]")?.InnerText;
                    var weight = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[7]/pk-identifier/span[2]")?.InnerText;
                    //if (db != null)
                    //{
                    //    playerEntity.Birthday = DateTime.Parse(db);
                    //}



                    var playerEntity = unitOfWork.Player.FindAsync(p => p.LastName == name[1].Trim()).Result;
                    if (playerEntity == null)
                    {
                        continue;
                    }
                    playerEntity.FirstName = name[1];
                    var shirtNumberNode = doc.DocumentNode.SelectSingleNode("/div/div[3]/div[1]/div[1]/div/div[2]/div[2]/pk-identifier/span[2]").InnerText;
                    if (shirtNumberNode != null)
                    {
                        playerEntity.ShirtNumber = int.Parse(shirtNumberNode);
                    }
                   
                    //var team = new TeamEntity()
                    //{
                    //    Name = name,
                    //    Slug = name.Replace(" ", ""),
                    //    Coach = doc.QuerySelectorAll("[column-key='coach'] span")[2].InnerText.Trim(),
                    //    Code = "",
                    //    FormLastGames = doc.QuerySelectorAll("#accordion-item-0 pk-accordion-item-title div")[1].InnerText,
                    //    ImageUrl = ""
                    //};
                    //await unitOfWork.Team.AddAsync(team);

                }
            }
        }
    }
}
