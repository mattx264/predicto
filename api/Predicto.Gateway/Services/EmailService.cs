using FluentEmail.Core;
using Predicto.Database.Interfaces;
using Predicto.Database.UnitOfWork;
using Predicto.Gateway.DTO.Email;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Gateway.Services
{
    public class EmailService : IEmailService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFluentEmail _fluentEmail;
        public EmailService(IFluentEmail fluentEmail, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _fluentEmail = fluentEmail
                ?? throw new ArgumentNullException(nameof(fluentEmail));
        }
        public async Task Send(EmailMetadataDto emailMetadata)
        {
            await _fluentEmail.To(emailMetadata.ToAddress)
                .Subject(emailMetadata.Subject)
                .Body(emailMetadata.Body)
                .SendAsync();
        }
        public async Task SendTemplate(EmailTemplateDto emailMetadata)
        {
            //var user=_unitOfWork.Users.FindAsync(x => x.Id == emailMetadata.UserId);
            //if (user == null)
            //{
            //    throw new Exception("User not found for id " + emailMetadata.UserId);
            //}
            //open template from file
            var body = File.ReadAllText("EmailTemplates/Invitation.html");
            var subject = "You have been invited - predicto.gg";
            await _fluentEmail.To(emailMetadata.ToAddress)
               .Subject(subject)
               .Body(body, isHtml: true)
               .SendAsync();
        }
    }

    public interface IEmailService
    {
        Task Send(EmailMetadataDto emailMetadata);
        Task SendTemplate(EmailTemplateDto emailMetadata);

    }
}
