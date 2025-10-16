using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities
{
    public class UserEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Lang { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsLocked { get; set; } = false;
    }
}
