using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Sport;

namespace Predicto.Database
{
    public class PredictoDbContext : DbContext
    {
        public DbSet<RoomEntity> Room => Set<RoomEntity>();
        public DbSet<UserEntity> User => Set<UserEntity>();
        public DbSet<SportCategoryEntity> SportCategory => Set<SportCategoryEntity>();
        public DbSet<TournamentEntity> Tournament => Set<TournamentEntity>();

        

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Data Source=MATYSACER;Initial Catalog=Predicto;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");

           // options.UseSqlServer("Data Source=DESKTOP-IF3RN33\\MSSQLSERVER01;Initial Catalog=Predicto;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");
            //"Data Source=SQL5106.site4now.net;Initial Catalog=db_9b0204_predicto;User Id=db_9b0204_predicto_admin;Password=xRu{TZw~0304
            options.UseSeeding(seed: new SeedData().Data());
         }
    }
}
