using Microsoft.AspNetCore.Mvc.Filters;

public static class RedisCacheHelper
{
    public static string GenerateCacheKey(ActionExecutingContext context)
    {
        var args = string.Join("_",
            context.ActionArguments.Select(a => $"{a.Key}:{a.Value}"));

        return $"{context.HttpContext.Request.Path}_{args}";
    }
    public static string GenerateCacheKey(string context)
    {
        return context;
    }
}