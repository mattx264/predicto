namespace Predicto.Gateway.DTO.User
{
    public class RegistrationReq
    {
        /*username: "",
            email: "",
            password: "",*/
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Lang { get; set; }

        public required string Password { get; set; }    

    }
}
