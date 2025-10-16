using Microsoft.AspNetCore.Mvc;
using Predicto.Gateway.DTO.Email;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        public EmailController(IEmailService emailService)
        {
            _emailService = emailService
                ?? throw new ArgumentNullException(nameof(emailService));
        }
        [HttpGet("singleemail")]
        public async Task<IActionResult> SendSingleEmail(string email)
        {
            EmailMetadataDto emailMetadata = new(){
                ToAddress = email,
                Subject = "FluentEmail Test email",
                Body = "This is a test email from FluentEmail." };
            await _emailService.Send(emailMetadata);
            return Ok();
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendSingleEmail(EmailTemplateDto sendEmailDto)
        {
            await _emailService.SendTemplate(sendEmailDto);
            return Ok();
        }
    }
}
