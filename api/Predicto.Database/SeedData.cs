using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities.Sport;

namespace Predicto.Database
{
    public class SeedData
    {
        public Action<DbContext, bool> Data()
        {
            return (context, someFlag) =>
            {
                // Seed logic here, e.g.:
                if (!context.Set<SportCategoryEntity>().Any())
                {
                    context.Add(new SportCategoryEntity { Name = "Soccer" });//FIFA World Cup
                }
                if (!context.Set<TournamentEntity>().Any())
                {
                    context.Add(new TournamentEntity { Name = "FIFA World Cup", SportCategoryId = 1 });
                }
                context.SaveChanges();
            };
        }
    }
}