using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.User;
using Predicto.Gateway.Extensions;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(RegistrationReq userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            /*username: "",
            email: "",
            password: "",*/
            await _userService.CreateUserAsync(userDto);
            return Ok();
        }
        [HttpPost("login")]
        public async Task<ActionResult<string>> Authenticate(LoginReq loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var token = await _userService.AuthenticateAsync(loginDto);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(new { Token = token });
        }
        [HttpGet]
        [Authorize]
        public async Task GetUser()
        {
            var userId = User.GetUserId();

        }

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
