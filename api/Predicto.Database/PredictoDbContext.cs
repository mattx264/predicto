using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Blog;
using Predicto.Database.Entities.Sport;
using Predicto.Gateway.DTO.Sport;

namespace Predicto.Database
{
    public class PredictoDbContext : DbContext
    {
        public DbSet<ArticleEntity> Article => Set<ArticleEntity>();
        public DbSet<RoomEntity> Room => Set<RoomEntity>();
        public DbSet<UserEntity> User => Set<UserEntity>();
        public DbSet<SportCategoryEntity> SportCategory => Set<SportCategoryEntity>();
        public DbSet<TournamentEntity> Tournament => Set<TournamentEntity>();
        public DbSet<TeamEntity> Team => Set<TeamEntity>();
        public DbSet<PlayerEntity> Player => Set<PlayerEntity>();
        public DbSet<TeamPlayerEntity> TeamPlayer => Set<TeamPlayerEntity>();
        public DbSet<GameEntity> Game => Set<GameEntity>();
        //  public DbSet<GameTeamEntity> GameTeamRepository => Set<GameTeamEntity>();



        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            //options.UseSqlServer("Data Source=MATYSACER;Initial Catalog=Predicto;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");

            //options.UseSqlServer("Data Source=DESKTOP-IF3RN33\\MSSQLSERVER01;Initial Catalog=Predicto;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");
            options.UseLazyLoadingProxies().UseSqlServer("Data Source=SQL8005.site4now.net;Initial Catalog=db_9b0204_predicto;User Id=db_9b0204_predicto_admin;Password=xRu{TZw~0304;multipleactiveresultsets=true");
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
            modelBuilder.Entity<TeamEntity>()
                .HasIndex(a => a.Slug)
                .IsUnique();

            modelBuilder.Entity<PlayerEntity>()
                .HasMany(g => g.Teams)
                .WithMany(t => t.Players);

            modelBuilder.Entity<TeamEntity>()
                .HasMany(g => g.Players)
                .WithMany(t => t.Teams);

            //   modelBuilder.Entity<TeamPlayerEntity>()
            //.HasOne(bc => bc.PlayerEntity)
            //.WithMany(b => b.Teams)
            //.HasForeignKey(bc => bc.PlayerId);
            //   modelBuilder.Entity<TeamPlayerEntity>()
            //       .HasOne(bc => bc.TeamEntity)
            //       .WithMany(c => c.Players)
            //       .HasForeignKey(bc => bc.TeamId);


            modelBuilder.Entity<GameEntity>()
             .HasOne(g => g.HomeTeam)
             .WithOne(t => t.Game)
             .HasForeignKey<GameEntity>(g => g.HomeTeamId)
                     .HasForeignKey<GameEntity>(g => g.AwayTeamId);
           //  .OnDelete(DeleteBehavior.Restrict);  // 👈 Important

            modelBuilder.Entity<GameEntity>()
                   .Ignore(g => g.AwayTeam);

        }
    }
}
