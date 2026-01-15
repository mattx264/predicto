using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Predicto.DataCollector.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection.Metadata;
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
        public IWebElement GetElementFromShadowDom(params string[] selectors)
        {
            //document.querySelector("pk-badge").shadowRoot.querySelector('img')
        
            if (driver == null)
            {
                throw new InvalidOperationException("ChromeDriver is not initialized. Call StartChrome first.");
            }

            ChromeDriver js = driver;
            var scriptString = "return document.querySelector";
            var selectorIndex = 0;
            var stopIndex = selectors.Length - 1;

            foreach (var selector in selectors)
            {
                var root = "('" + selector + "')";
                root += (selectorIndex != stopIndex && selectors.Length != 1) ? ".shadowRoot.querySelector" : null;
                selectorIndex++;
                scriptString += root;
            }
            try
            {
                var webElement = (IWebElement)js.ExecuteScript(scriptString);
                return webElement;
            }
            catch (Exception)
            {
                Console.WriteLine("error with " + scriptString);
                throw;
            }
            
        }
        public IWebElement GetElementsFromScript(string scriptString)
        {
            /*
            var list=[];document.querySelectorAll('.pk-col--content pk-table').forEach(x=>{x.querySelectorAll('pk-table-body pk-avatar').forEach(y=>{
            list.push(y.shadowRoot.querySelector('img'))
            })});return list;
            */
            //selectors
            if (driver == null)
            {
                throw new InvalidOperationException("ChromeDriver is not initialized. Call StartChrome first.");
            }

            ChromeDriver js = driver;
          
            try
            {
                var webElement = (IWebElement)js.ExecuteScript(scriptString);
                return webElement;
            }
            catch (Exception)
            {
                Console.WriteLine("error with " + scriptString);
                throw;
            }
        }
        public List<IWebElement> GetElementsFromShadowDom(params string[] selectors)
        {

            if (driver == null)
            {
                throw new InvalidOperationException("ChromeDriver is not initialized. Call StartChrome first.");
            }

            ChromeDriver js = driver;
            var scriptString = "return document.querySelector";
            var selectorIndex = 0;
            var stopIndex = selectors.Length - 1;

            foreach (var selector in selectors)
            {
                var root = "('" + selector + "')";
                root += (selectorIndex != stopIndex && selectors.Length != 1) ? ".shadowRoot.querySelectorAll" : null;
                selectorIndex++;
                scriptString += root;
            }
            var webElements = js.ExecuteScript(scriptString) as IEnumerable<IWebElement>;
            return webElements?.ToList() ?? new List<IWebElement>();
           
        }
       
        internal IWebElement GetElementByXPath(string selector)
        {
            var element = driver.FindElement(By.XPath(selector));
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

    }

}
