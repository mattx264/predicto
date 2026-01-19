using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Text;

namespace Predicto.Gateway.Middleware.Redis
{
    public class MemoryCacheService : ICacheService
    {
        private readonly IMemoryCache _cache;

        public MemoryCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }


        public string? GetString(string key)
        {
            return _cache.TryGetValue(key, value: out string? value) ? value : default;
        }
        public void SetString(string key, string value, int? absoluteExpirationSec)
        {
            var options = new MemoryCacheEntryOptions();

            if (absoluteExpirationSec.HasValue)
            {
                var absoluteExpiration = TimeSpan.FromSeconds(absoluteExpirationSec.Value);
                options.SetAbsoluteExpiration(absoluteExpiration);
            }

            _cache.Set(key, value, options);
        }
        public T? Get<T>(string key)
        {
            return _cache.TryGetValue(key, out T value) ? value : default;
        }
        public void Set<T>(string key, T value, int? absoluteExpirationSec)
        {
            var options = new MemoryCacheEntryOptions();
            if (absoluteExpirationSec.HasValue)
            {
                var absoluteExpiration = TimeSpan.FromSeconds(absoluteExpirationSec.Value);
                options.SetAbsoluteExpiration(absoluteExpiration);
            }
            _cache.Set(key, value, options);
        }
        //public T? Get<T>(string key)
        //{
        //    return _cache.TryGetValue(key, out T value) ? value : default;
        //}
        //public bool TryGet<T>(string key, out T value)
        //{
        //    return _cache.TryGetValue(key, out value);
        //}

        //public void Set<T>(string key, T value, TimeSpan? absoluteExpiration = null)
        //{
        //    var options = new MemoryCacheEntryOptions();

        //    if (absoluteExpiration.HasValue)
        //    {
        //        options.SetAbsoluteExpiration(absoluteExpiration.Value);
        //    }

        //    _cache.Set(key, value, options);
        //}

        //public void Remove(string key)
        //{
        //    _cache.Remove(key);
        //}
    }


}



