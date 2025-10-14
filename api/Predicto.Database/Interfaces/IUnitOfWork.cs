using Microsoft.EntityFrameworkCore;
using Predicto.Database.Entities;
using Predicto.Database.Entities.Sport;
using Predicto.Database.Interfaces.Repositories;
using Predicto.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<UserEntity> Users { get; }
        IRepository<RoomEntity> Rooms { get; }
        IRepository<SportCategoryEntity> SportCategory { get; }
        IRepository<TournamentEntity> Tournament { get; }
        Task<int> CompleteAsync(); // SaveChanges
    }
}
