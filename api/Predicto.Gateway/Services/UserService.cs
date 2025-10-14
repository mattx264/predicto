using Predicto.Database.Entities;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.User;

namespace Predicto.Gateway.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateUserAsync(string name)
        {
           // var user = new UserEntity { Name = name };
          //  await _unitOfWork.Users.AddAsync(user);
          //  await _unitOfWork.CompleteAsync();
        }

        public async Task<UserDto> GetUserAsync()
        {
            var user = await _unitOfWork.Users.GetByIdAsync(1);
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name
            };
        }
    }
    public interface IUserService
    {
        Task CreateUserAsync(string name);
        Task<UserDto> GetUserAsync();
    }
}
