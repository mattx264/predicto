using System.Security.Claims;

namespace Predicto.Gateway.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var userId= user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                throw new Exception("Invalid token, user id is missing");
            }
            return int.Parse(userId);
        }
    }
}
