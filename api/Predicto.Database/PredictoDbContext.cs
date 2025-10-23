using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Blog;
using Predicto.Database.Entities.Sport;
using Predicto.Gateway.DTO.Sport;
using System.Numerics;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Predicto.Database
{
    public class PredictoDbContext : DbContext
    {
        public DbSet<RoomEntity> Room => Set<RoomEntity>();
        public DbSet<UserEntity> User => Set<UserEntity>();
        public DbSet<SportCategoryEntity> SportCategory => Set<SportCategoryEntity>();
        public DbSet<TournamentEntity> Tournament => Set<TournamentEntity>();
        public DbSet<TeamEntity> Team => Set<TeamEntity>();
        public DbSet<PlayerEntity> Player => Set<PlayerEntity>();
        public DbSet<TeamPlayerEntity> TeamPlayer => Set<TeamPlayerEntity>();
        public DbSet<GameEntity> Game => Set<GameEntity>();



        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            //options.UseSqlServer("Data Source=MATYSACER;Initial Catalog=Predicto;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");

            //options.UseSqlServer("Data Source=DESKTOP-IF3RN33\\MSSQLSERVER01;Initial Catalog=Predicto;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");
            options.UseSqlServer("Data Source=SQL5112.site4now.net;Initial Catalog=db_9b0204_predicto;User Id=db_9b0204_predicto_admin;Password=xRu{TZw~0304");
            options.UseSeeding(seed: new SeedData().Data());
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var eTypes = modelBuilder.Model.GetEntityTypes();
            foreach (var type in eTypes)
            {
                var foreignKeys = type.GetForeignKeys();
                foreach (var foreignKey in foreignKeys)
                {
                    foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
                }
            }
            //make unique column for article slug
            modelBuilder.Entity<ArticleEntity>()
                .HasIndex(a => a.Slug)
                .IsUnique();
            modelBuilder.Entity<PlayerEntity>()
                .HasIndex(a => a.Slug)
                .IsUnique();

        }
    }
}
