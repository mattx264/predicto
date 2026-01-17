using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Predicto.Gateway.Middleware.Redis;
using System.Text.Json;

[AttributeUsage(AttributeTargets.Method)]
public class CacheAttribute : Attribute, IAsyncActionFilter
{
    private readonly int _durationSeconds;
    private readonly bool useRedis = false;
    public CacheAttribute(int durationSeconds = 60)
    {
        _durationSeconds = durationSeconds;
    }



    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var services = context.HttpContext.RequestServices;

        var cache = services.GetRequiredService<ICacheService>();
        if (cache == null)
        {
            throw new Exception("ICacheService is not available");
        }
        var jsonOptions = services
            .GetRequiredService<IOptions<JsonOptions>>()
            .Value
            .JsonSerializerOptions;

        var cacheKey = RedisCacheHelper.GenerateCacheKey(context.HttpContext.Request.Path);

        var cachedData = cache.GetString(cacheKey);
        if (cachedData != null)
        {
            var result = JsonSerializer.Deserialize<object>(
                cachedData, jsonOptions);

            context.Result = new OkObjectResult(result);
            return;
        }

        var executedContext = await next();

        if (executedContext.Result is ObjectResult objectResult)
        {
            var json = JsonSerializer.Serialize(
                objectResult.Value, jsonOptions);

            cache.SetString(
                cacheKey,
                json,
              _durationSeconds);
        }
    }


}