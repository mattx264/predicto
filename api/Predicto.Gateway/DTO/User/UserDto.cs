namespace Predicto.Gateway.DTO.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
    }
}
