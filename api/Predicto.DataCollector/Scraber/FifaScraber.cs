using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Predicto.DataCollector.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Predicto.DataCollector.Scraber
{
    public class FifaScraber
    {
        public void StartChrome()
        {
            // Initialize ChromeDriver
            var driver = new ChromeDriver();
            // Navigate to the specified URL
            driver.Navigate().GoToUrl("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/qualifiers/uefa/scores-fixtures?country=PL&wtw-filter=ALL");
            // Additional actions can be implemented here
            // Close the browser after tasks are complete
           Thread.Sleep(10000);

           //  var elements = driver.FindElements(By.CssSelector(".grid-container-custom .row .match-row_matchRowContainer__NoCRI"));
            var elements = driver.FindElements(By.CssSelector(".grid-container-custom .row a"));
            var data = new RootGameInfo();
            try
            {
                foreach (var page in elements)
                {
               
                    var url = page.GetAttribute("href");
                    driver.Navigate().GoToUrl(url);
                    Thread.Sleep(10000);                    
                    var element = driver.FindElement(By.CssSelector("main"));
                    var groupAndDate = element.FindElements(By.CssSelector(".match-details-header-main-component_MatchDate__os-xd"));
                    var group = groupAndDate[0].GetAttribute("innerText");
                    var dateString = groupAndDate[1].GetAttribute("innerText").Replace("•", "");
                    var date = DateTime.Parse(dateString ?? "");

                    var teams = element.FindElements(By.CssSelector(".match-score_TeamName__519Ix"));
                    // Console.WriteLine(teams[0].GetAttribute("innerHTML"));
                    // Console.WriteLine(teams[1].GetAttribute("innerHTML"));
                    var score = element.FindElement(By.CssSelector(".show-match-score_BigFont__pfLm9"));

                    var gameInfo = new GameInfo
                    {
                        Date = date,
                        Group = group ?? "",
                        HomeTeam = teams[0].GetAttribute("innerText") ?? "",
                        AwayTeam = teams[1].GetAttribute("innerText") ?? "",
                        Url = url
                    };
                    if(score.GetAttribute("innerText")!=null && score.GetAttribute("innerText").Contains("-"))
                    {
                        gameInfo.HomeScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[0].Trim() ?? "0");
                        gameInfo.AwayScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[1].Trim() ?? "0");
                    }
                    data.Games.Add(gameInfo);

            }
            }
            catch (Exception ex)
            {
                File.WriteAllText(File.Exists("test.txt") ? "test.txt" : "test.txt", JsonSerializer.Serialize(data));

            }
            finally
            {
                driver.Quit();
                File.WriteAllText(File.Exists("test.txt") ? "test.txt" : "test.txt", JsonSerializer.Serialize(data));
            }
        }
        public void StartChromeDetails()
        {
            // Initialize ChromeDriver
            var driver = new ChromeDriver();
            // Navigate to the specified URL
            //  driver.Navigate().GoToUrl("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/qualifiers/uefa/scores-fixtures?country=PL&wtw-filter=ALL");
            // Additional actions can be implemented here
            // Close the browser after tasks are complete
            //    Thread.Sleep(10000);

            // var elements = driver.FindElements(By.CssSelector(".grid-container-custom .row .match-row_matchRowContainer__NoCRI"));
            //    var elements = driver.FindElements(By.CssSelector(".grid-container-custom .row a"));
            var jsonLines = File.ReadAllText("C:\\Users\\mattx\\src\\predicto\\api\\Predicto.DataCollector\\Data\\fifa.json");
            var elements = JsonSerializer.Deserialize<RootGameInfo>(jsonLines);
            var data = new RootGameInfo();
            try
            {
                foreach (var page in elements.Games)
                {
                    if (page.AwayTeam != null)
                    {
                        continue;
                    }

                    driver.Navigate().GoToUrl(page.Url);
                    Thread.Sleep(10000);
                    var test = driver.FindElements(By.CssSelector("main"));
                    if (test == null || test[0] == null)
                    {
                        data.Games.Add(new GameInfo
                        {
                            Url = page.Url
                        });
                        continue;
                    }
                    var element = driver.FindElement(By.CssSelector("main"));
                    var groupAndDate = element.FindElements(By.CssSelector(".match-details-header-main-component_MatchDate__os-xd"));
                    var group = groupAndDate[0].GetAttribute("innerText");
                    var dateString = groupAndDate[1].GetAttribute("innerText").Replace("•", "");
                    var date = DateTime.Parse(dateString ?? "");

                    var teams = element.FindElements(By.CssSelector(".match-score_TeamName__519Ix"));
                    // Console.WriteLine(teams[0].GetAttribute("innerHTML"));
                    // Console.WriteLine(teams[1].GetAttribute("innerHTML"));
                    var score = element.FindElement(By.CssSelector(".show-match-score_BigFont__pfLm9"));

                    var gameInfo = new GameInfo
                    {
                        Date = date,
                        Group = group ?? "",
                        HomeTeam = teams[0].GetAttribute("innerText") ?? "",
                        AwayTeam = teams[1].GetAttribute("innerText") ?? "",
                        //HomeScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[0].Trim() ?? "0"),
                        // AwayScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[1].Trim() ?? "0"),
                        Url = page.Url
                    };
                    if (score.GetAttribute("innerText") != null && score.GetAttribute("innerText").Contains("-"))
                    {
                        gameInfo.HomeScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[0].Trim() ?? "0");
                        gameInfo.AwayScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[1].Trim() ?? "0");
                    }
                    data.Games.Add(gameInfo);
                    //Console.WriteLine(group.GetAttribute("innerText"));

                }
            }
            catch (Exception ex)
            {
                File.WriteAllText(File.Exists("test.txt") ? "test.txt" : "test.txt", JsonSerializer.Serialize(data));

            }
            finally
            {
                driver.Quit();
                File.WriteAllText(File.Exists("test.txt") ? "test.txt" : "test.txt", JsonSerializer.Serialize(data));
            }
        }
    }
    class RootGameInfo
    {
        public List<GameInfo> Games { get; set; }= new List<GameInfo>();
    }
    class GameInfo
    {
        public string Url { get; set; }
        public DateTime Date { get; set; }
        public string Group { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public int HomeScore { get; set; }
        public int AwayScore { get; set; }
    }
}
