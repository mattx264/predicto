using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Text;

namespace Predicto.Gateway.Middleware.Redis
{
    public class RedisCacheService : ICacheService
    {
        //        private readonly IOptions<Microsoft.AspNetCore.Http.Json.JsonOptions> _jsonOption;
        //        private readonly bool isRedisOn;
        private readonly IDistributedCache _cache;
        //       // private readonly IAuthenticatedUser _currentUserService;
        //        private readonly ILogger<RedisCacheService> _logger;

        public RedisCacheService(IDistributedCache cache, ILogger<RedisCacheService> logger, IConfiguration config)
        {
            //            isRedisOn= config.GetValue<bool>("Redis:IsTurnOn");
            //          //  _jsonOption = jsonOption;
            _cache = cache ?? throw new ArgumentNullException(nameof(cache));
            //            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            //          //  _currentUserService = currentUserService ?? throw new ArgumentNullException(nameof(logger));
            //        }

            //        public async Task<T?> GetAsync<T>(string cacheKey, CancellationToken cancellationToken)
            //        {
            //            //  var currentUser = _currentUserService.GetCurrentUser();

            //            var cachedResponse = await _cache.GetAsync(cacheKey.ToLower(), cancellationToken);
            //            if (cachedResponse != null)
            //            {
            //                return JsonConvert.DeserializeObject<T>(Encoding.Default.GetString(cachedResponse));
            //            }
            //            return default;
            //        }

            //        public async Task SetAsync<T>(string cacheKey, T data, DistributedCacheEntryOptions options, CancellationToken cancellationToken)
            //        {
            //            var serializedData = Encoding.Default.GetBytes(JsonConvert.SerializeObject(data));

            //            var currentUser = _currentUserService.GetCurrentUser();
            //            await _cache.SetAsync(currentUser.CompanyId + cacheKey.ToLower(), serializedData, options, cancellationToken);
            //            await TrackAllKeyAsync(currentUser.CompanyId + cacheKey.ToLower(), cancellationToken);
            //        }

            //        private async Task TrackAllKeyAsync(string cacheKey, CancellationToken cancellationToken)
            //        {
            //            var currentUser = _currentUserService.GetCurrentUser();
            //            var keyList = await GetAllTrackedKeysAsync(cancellationToken);
            //            if (!keyList.Contains(currentUser.CompanyId + cacheKey))
            //            {
            //                keyList.Add(cacheKey);
            //                await SaveAllTrackedKeysAsync(keyList, cancellationToken);
            //            }
            //        }

            //        private async Task<List<string>> GetAllTrackedKeysAsync(CancellationToken cancellationToken)
            //        {
            //            var currentUser = _currentUserService.GetCurrentUser();
            //            var cachedKeys = await _cache.GetAsync(currentUser.CompanyId, cancellationToken);
            //            if (cachedKeys != null)
            //            {
            //                return JsonConvert.DeserializeObject<List<string>>(Encoding.Default.GetString(cachedKeys)) ?? new List<string>();
            //            }
            //            return new List<string>();
            //        }

            //        private async Task SaveAllTrackedKeysAsync(List<string> keys, CancellationToken cancellationToken)
            //        {
            //            var currentUser = _currentUserService.GetCurrentUser();
            //            var serializedKeys = Encoding.Default.GetBytes(JsonConvert.SerializeObject(keys));
            //            await _cache.SetAsync(currentUser.CompanyId, serializedKeys, new DistributedCacheEntryOptions(), cancellationToken);
            //        }

            //        public async Task RemoveAllAsync(CancellationToken cancellationToken)
            //        {
            //            var keys = await GetAllTrackedKeysAsync(cancellationToken);
            //            foreach (var key in keys)
            //            {
            //                await _cache.RemoveAsync(key, cancellationToken);
            //            }

            //            var currentUser = _currentUserService.GetCurrentUser();
            //            await _cache.RemoveAsync(currentUser.CompanyId, cancellationToken);
            //        }
        }
        public string? GetString(string key)
        {
            return _cache.GetString(key);
        }
        public void SetString(string key, string value, int? absoluteExpirationSec)
        {
            DistributedCacheEntryOptions options;

            if (absoluteExpirationSec.HasValue)
            {
                options = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds((int)absoluteExpirationSec)
                };

                _cache.SetString(key, value, options);
                return;
            }

            _cache.SetString(key, value);

        }
        public string Get<T>(string key)
        {
            return _cache.GetString(key);
        }

        public void Remove(string key)
        {
            throw new NotImplementedException();
        }

        public void Set<T>(string key, T value, TimeSpan? absoluteExpiration = null)
        {
            throw new NotImplementedException();
        }

        public bool TryGet<T>(string key, out T value)
        {
            throw new NotImplementedException();
        }
    }
}