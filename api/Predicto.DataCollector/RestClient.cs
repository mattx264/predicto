using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace Predicto.DataCollector
{
    public class RestClient
    {
        private readonly HttpClient httpClient;
        public RestClient() {
            httpClient=new HttpClient();
            httpClient.DefaultRequestHeaders.Add("x-apisports-key", "a881a2d202f25c9cdb8de747783ca1a2");
           // httpClient.DefaultRequestHeaders.Add("x-apisports-key", "a30c8eb04be7169bfb21f20cc1b25e63");//sarniak

            
        }

        public async Task<string> GetAsync(string url)
        {

            try
            {
                HttpResponseMessage response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var responseData = await response.Content.ReadAsStringAsync();
                return responseData;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request error: {e.Message}");
                throw new Exception("Error fetching data from " + url);
            }
        }
        //public static async Task PostExampleAsync()
        //{
        //    var url = "https://api.example.com/post";

        //    var payload = new
        //    {
        //        name = "John Doe",
        //        email = "john@example.com"
        //    };

        //    var json = JsonConvert.SerializeObject(payload);
        //    var content = new StringContent(json, Encoding.UTF8, "application/json");

        //    try
        //    {
        //        HttpResponseMessage response = await httpClient.PostAsync(url, content);
        //        response.EnsureSuccessStatusCode();

        //        string responseBody = await response.Content.ReadAsStringAsync();
        //        Console.WriteLine(responseBody);
        //    }
        //    catch (HttpRequestException e)
        //    {
        //        Console.WriteLine($"Request error: {e.Message}");
        //    }
        //}
    }
}
