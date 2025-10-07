using Predicto.Gateway.Hubs;
using Predicto.Gateway.Hubs.Room;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<TestHub>("/testHub/{group}");
app.MapHub<RoomsHub>("/roomsHub");
app.MapHub<RoomHub>("/roomHub/{roomid}");

app.Run();
