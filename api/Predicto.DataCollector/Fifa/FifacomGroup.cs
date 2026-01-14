using Predicto.Database.Entities.Sport;
using Predicto.Database.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Predicto.DataCollector.Fifa
{
    public class FifacomGroup
    {
        string dataPath = "C:\\Users\\mattx\\src\\Predicto\\api\\Predicto.DataCollector\\Data\\Fifacom\\Group\\";

        public async Task SeedData(UnitOfWork unitOfWork)
        {
            var json = File.ReadAllText(dataPath + "standing.json");
            var data = JsonSerializer.Deserialize<RootGroup>(json);
            foreach (var item in data.Results)
            {
                var teamName= FifacomHelper.TeamNormalization(item.Team.Name[0].Description);
                var team = await unitOfWork.Team.FindAsync(x => x.Name == teamName);
                if (team == null)
                {
                    throw new Exception("Team not found: " + item.Team.Name[0].Description);
                }
                var gameteam = new GameGroupTeamEntity()
                {
                    Won = item.Won,
                    Lost = item.Lost,
                    Drawn = item.Drawn,
                    GoalsDiference = item.GoalsDiference,
                    Points = item.Points,
                    Team = team
                };
                var group = await unitOfWork.GameGroup.FindAsync(x => x.Name == item.Group[0].Description);
                if (group == null)
                {
                    group = new GameGroupEntity()
                    {
                        GameGroupTeam = new List<GameGroupTeamEntity>() { gameteam },
                        IsActive = true,
                        Name = item.Group[0].Description
                    };
                    await unitOfWork.GameGroup.AddAsync(group,1);
                }
                else
                {
                    if (group.GameGroupTeam.Any(gameteam => gameteam.TeamId == team.Id)==false )
                    {
                        group.GameGroupTeam.Add(gameteam);
                    }
                }
                await unitOfWork.CompleteAsync();
                //item.
            }
        }
    }
}
