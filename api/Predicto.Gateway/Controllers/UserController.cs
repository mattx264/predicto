using Microsoft.AspNetCore.Mvc;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
       

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }
        //[HttpPost]
        //public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    await _userService.CreateUserAsync(userDto);
        //    return CreatedAtAction(nameof(GetUser), new { id = userDto.Id }, userDto);
        //}
        //[HttpPost]
        //public async Task<IActionResult> Authenticate([FromBody] LoginDto loginDto)
        //{
        //    var token = await _userService.AuthenticateAsync(loginDto);
        //    if (token == null)
        //    {
        //        return Unauthorized();
        //    }
        //    return Ok(new { Token = token });
        //}

        //[HttpGet(Name = "GetWeatherForecast")]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        //        TemperatureC = Random.Shared.Next(-20, 55),
        //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }
}
