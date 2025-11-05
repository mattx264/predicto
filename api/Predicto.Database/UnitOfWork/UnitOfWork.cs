using Predicto.Database.Entities;
using Predicto.Database.Entities.Blog;
using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces;
using Predicto.Database.Interfaces.Repositories;
using Predicto.Database.Repositories;
using Predicto.Gateway.DTO.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PredictoDbContext _context;
        public IRepository<UserEntity> Users { get; }

        public IRepository<RoomEntity> Rooms { get; }

        public IRepository<SportCategoryEntity> SportCategory { get; }

        public IRepository<TournamentEntity> Tournament { get; }

        public IRepository<TeamEntity> Team { get; }

        public IRepository<PlayerEntity> Player { get; }

        public IRepository<TeamPlayerEntity> TeamPlayer { get; }

        public IRepository<GameEntity> Game { get; }

        public IRepository<ArticleEntity> Article { get; }

        public UnitOfWork(PredictoDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
             Rooms = new RoomRepository(_context); 
            SportCategory = new Repository<SportCategoryEntity>(_context);
            Tournament = new Repository<TournamentEntity>(_context);
            Team = new Repository<TeamEntity>(_context);
            Player = new Repository<PlayerEntity>(_context);
            TeamPlayer = new Repository<TeamPlayerEntity>(_context);
            Game = new Repository<GameEntity>(_context);
            Article = new Repository<ArticleEntity>(_context);
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
