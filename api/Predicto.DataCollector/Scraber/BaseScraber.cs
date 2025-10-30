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
    public class BaseScraber<T> : IDisposable
    {
        private ChromeDriver driver;
        ~BaseScraber()
        {
            Dispose(true);
        }

        public void StartChrome(string url, int sleep = 10000)
        {
            driver = new ChromeDriver();
            // Navigate to the specified URL
            driver.Navigate().GoToUrl(url);
            Thread.Sleep(sleep);
        }
        public IList<IWebElement> GetElements(string selector)
        {
            var elements = driver.FindElements(By.CssSelector(selector));
            return elements;
        }
        internal IWebElement GetElement(string selector)
        {
            var element = driver.FindElement(By.CssSelector(selector));
            return element;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                driver?.Quit();

                driver?.Dispose();

            }
        }


        //public void StartChrome(string selector, int sleep=10000)
        //{
        //    // Initialize ChromeDriver
        //    var driver = new ChromeDriver();
        //    // Navigate to the specified URL
        //    driver.Navigate().GoToUrl("https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/qualifiers/uefa/scores-fixtures?country=PL&wtw-filter=ALL");
        //    // Additional actions can be implemented here
        //    // Close the browser after tasks are complete
        //   Thread.Sleep(sleep);

        //    var elements = driver.FindElements(By.CssSelector(selector));

        //        foreach (var page in elements)
        //        {

        //            var url = page.GetAttribute("href");
        //            driver.Navigate().GoToUrl(url);
        //            Thread.Sleep(10000);                    
        //            var element = driver.FindElement(By.CssSelector("main"));
        //            var groupAndDate = element.FindElements(By.CssSelector(".match-details-header-main-component_MatchDate__os-xd"));
        //            var group = groupAndDate[0].GetAttribute("innerText");
        //            var dateString = groupAndDate[1].GetAttribute("innerText").Replace("•", "");
        //            var date = DateTime.Parse(dateString ?? "");

        //            var teams = element.FindElements(By.CssSelector(".match-score_TeamName__519Ix"));
        //            // Console.WriteLine(teams[0].GetAttribute("innerHTML"));
        //            // Console.WriteLine(teams[1].GetAttribute("innerHTML"));
        //            var score = element.FindElement(By.CssSelector(".show-match-score_BigFont__pfLm9"));

        //            var gameInfo = new GameInfo
        //            {
        //                Date = date,
        //                Group = group ?? "",
        //                HomeTeam = teams[0].GetAttribute("innerText") ?? "",
        //                AwayTeam = teams[1].GetAttribute("innerText") ?? "",
        //                Url = url
        //            };
        //            if(score.GetAttribute("innerText")!=null && score.GetAttribute("innerText").Contains("-"))
        //            {
        //                gameInfo.HomeScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[0].Trim() ?? "0");
        //                gameInfo.AwayScore = int.Parse(score.GetAttribute("innerText")?.Split('-')[1].Trim() ?? "0");
        //            }
        //            data.Games.Add(gameInfo);

        //    }
        //    }

        //}

    }

}
