using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Predicto.Database;
using Predicto.Database.Interfaces;
using Predicto.Database.UnitOfWork;
using Predicto.Gateway.Extensions;
using Predicto.Gateway.Hubs;
using Predicto.Gateway.Hubs.Room;
using Predicto.Gateway.Services;
using Predicto.Gateway.Services.Room;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSignalR();
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!))
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;


            if (!string.IsNullOrEmpty(accessToken) &&
                (path.StartsWithSegments("/roomsHub") ||
                 path.StartsWithSegments("/roomHub") ||
                 path.StartsWithSegments("/testHub")))
            {
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});
builder.Services.AddAuthorization();
//builder.Services.AddDbContext<PredictoDbContext>(options =>
//    options.UseSqlServer("Your_Connection_String"));
builder.Services.AddDbContext<PredictoDbContext>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITournamentService, TournamentService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IGameService, GameService>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<IGameRoomService, GameRoomService>();



builder.Services.AddFluentEmail(builder.Configuration);




builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:5174",
                "http://127.0.0.1:5173",
                "http://blog.predicto.gg",
                "https://blog.predicto.gg",
                "http://predicto.gg"
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseStaticFiles();
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapFallbackToFile("index.html");
app.MapControllers();
app.MapHub<TestHub>("/testHub/{group}");
app.MapHub<RoomsHub>("/roomsHub");
app.MapHub<RoomHub>("/roomHub/{roomid}");

app.Run();