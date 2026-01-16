using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using System.Text.Json;

[AttributeUsage(AttributeTargets.Method)]
public class RedisCacheAttribute : Attribute, IAsyncActionFilter
{
    private readonly int _durationSeconds;

    public RedisCacheAttribute(int durationSeconds = 60)
    {
        _durationSeconds = durationSeconds;
    }

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var services = context.HttpContext.RequestServices;

        var cache = services.GetRequiredService<IDistributedCache>();
        var jsonOptions = services
            .GetRequiredService<IOptions<JsonOptions>>()
            .Value
            .JsonSerializerOptions;

        var cacheKey = RedisCacheHelper.GenerateCacheKey(context.HttpContext.Request.Path);

        var cachedData = await cache.GetStringAsync(cacheKey);
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

            await cache.SetStringAsync(
                cacheKey,
                json,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow =
                        TimeSpan.FromSeconds(_durationSeconds)
                });
        }
    }

   
}