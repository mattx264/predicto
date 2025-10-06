using Microsoft.AspNetCore.SignalR;

namespace Predicto.Gateway.Hubs
{
    public class TestHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var id = Context?.GetHttpContext()?.GetRouteValue("group") as string;

            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        //public async Task SendMessageObject(string user, string message)
        //{
        //    await Clients.
        //}

        public async Task SendMessageGroup(string user, string message)
        {
            await Clients.Group("SignalR Users").SendAsync("ReceiveMessageGroup", user, message);
        }
    }
}

