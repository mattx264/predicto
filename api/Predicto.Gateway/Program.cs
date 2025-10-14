using Predicto.Database;
using Predicto.Database.Interfaces;
using Predicto.Database.UnitOfWork;
using Predicto.Gateway.Hubs;
using Predicto.Gateway.Hubs.Room;
using Predicto.Gateway.Services;
using Predicto.Gateway.Services.Room;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSignalR();
//builder.Services.AddDbContext<PredictoDbContext>(options =>
//    options.UseSqlServer("Your_Connection_String"));
builder.Services.AddDbContext<PredictoDbContext>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITournamentService, TournamentService>();
builder.Services.AddScoped<IRoomService, RoomService>();



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
