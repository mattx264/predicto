using FluentEmail.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Predicto.Database.Entities;
using Predicto.Database.Interfaces;
using Predicto.Gateway.DTO.User;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Predicto.Gateway.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        private readonly PasswordHasher<RegistrationReq> _passwordHasher = new PasswordHasher<RegistrationReq>();

        public UserService(IUnitOfWork unitOfWork, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _config = config;
        }

        public async Task CreateUserAsync(RegistrationReq user)
        {

            var password = _passwordHasher.HashPassword(user, user.Password);
            var userEntity = new UserEntity { Name = user.Username, Email = user.Email, Password = password, Lang = user.Lang };
            await _unitOfWork.Users.AddAsync(userEntity, 0);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<string?> AuthenticateAsync(LoginReq loginDto)
        {
            var hasher = new PasswordHasher<LoginReq>();
            var user = await _unitOfWork.Users.FindAsync(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return null;
            }
            var password = hasher.VerifyHashedPassword(loginDto, user.Password, loginDto.Password);

            if (password == PasswordVerificationResult.Success)
            {
                // Generate and return a JWT token
                var token = GenerateJSONWebToken(user);
                return token;
            }

            return null;
        }

        //public async Task<UserDto> GetUserAsync()
        //{
        //    var user = await _unitOfWork.Users.GetByIdAsync(1);
        //    if (user == null)
        //    {
        //        throw new Exception("User not found");
        //    }
        //    return new UserDto
        //    {
        //        Id = user.Id,
        //        Name = user.Name
        //    };
        //}

        private string GenerateJSONWebToken(UserEntity userInfo)
        {
            var jwtKey = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT key is not configured.");
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.Id.ToString()),
             new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
            // new Claim("DateOfJoing", userInfo.DateOfJoing.ToString("yyyy-MM-dd")),
             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
         };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
    public interface IUserService
    {
        Task CreateUserAsync(RegistrationReq user);
        Task<string?> AuthenticateAsync(LoginReq loginDto);
       // Task<UserDto> GetUserAsync();
    }
}
