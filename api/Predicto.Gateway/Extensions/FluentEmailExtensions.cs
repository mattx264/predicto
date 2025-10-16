using System.Net;
using System.Net.Mail;

namespace Predicto.Gateway.Extensions
{
    public static class FluentEmailExtensions
    {
        public static void AddFluentEmail(this IServiceCollection services,
       ConfigurationManager configuration)
        {
            
            var emailSettings = configuration.GetSection("EmailSettings");
            var defaultFromEmail = emailSettings["DefaultFromEmail"];
            var host = emailSettings["SMTPSettingHost"];
            var port = emailSettings.GetValue<int>("Port");
            var userName = emailSettings["UserName"];
            var password = emailSettings["Password"];
            SmtpClient smtpClient = new SmtpClient(host, port);
            smtpClient.EnableSsl = false;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(userName, password);
            services.AddFluentEmail(defaultFromEmail)
                .AddSmtpSender(smtpClient);
         

        }
    }
}
