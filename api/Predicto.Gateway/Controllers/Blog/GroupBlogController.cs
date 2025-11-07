using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers.Blog
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupBlogController :ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupBlogController(IGroupService groupService)
        {
            _groupService = groupService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _groupService.GetAllGroups());
        }
    }
}
