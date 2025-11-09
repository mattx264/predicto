using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Blog;
using Predicto.Database.Entities.Sport;

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
        public DbSet<GameGroupEntity> GameGroup => Set<GameGroupEntity>();
        public DbSet<GameTeamEntity> GameTeam => Set<GameTeamEntity>();



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

                    // Unique indexes
                    modelBuilder.Entity<ArticleEntity>()
                        .HasIndex(a => a.Slug)
                        .IsUnique();

                    modelBuilder.Entity<PlayerEntity>()
                        .HasIndex(a => a.Slug)
                        .IsUnique();


                    modelBuilder.Entity<RoomEntity>()
                        .HasOne(r => r.CreatedByUser)
                        .WithMany()
                        .HasForeignKey(r => r.CreatedByUserId)
                        .OnDelete(DeleteBehavior.Restrict);

                    modelBuilder.Entity<RoomEntity>()
                        .HasMany(r => r.Participants)
                        .WithMany(u => u.JoinedRooms)
                        .UsingEntity<Dictionary<string, object>>(
                            "RoomParticipants",
                            j => j.HasOne<UserEntity>().WithMany().HasForeignKey("UserId"),
                            j => j.HasOne<RoomEntity>().WithMany().HasForeignKey("RoomId"),
                            j =>
                            {
                                j.HasKey("RoomId", "UserId");
                                j.ToTable("RoomParticipants");
                            }
                        );
                }
            }
        }
    }
}