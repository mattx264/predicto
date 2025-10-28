using Predicto.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities
{
    public class UserEntity : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Lang { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Bio { get; set; }
        public string? Localization { get; set; }
        public string? PhotoUrl { get; set; }

        public string? ResetPasswordToken { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsLocked { get; set; } = false;
    }
}
