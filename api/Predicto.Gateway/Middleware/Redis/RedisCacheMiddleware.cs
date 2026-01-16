//using Microsoft.Extensions.Caching.Distributed;
//using StackExchange.Redis;
//using System.Text.Json;

//namespace Predicto.Gateway.Middleware.Redis
//{
//    public class RedisCache : IDistributedCache
//    {
//        private readonly IConnectionMultiplexer _connectionMultiplexer;
//        private readonly IDatabase _database;

//        public RedisCache(IConnectionMultiplexer connectionMultiplexer)
//        {
//            _connectionMultiplexer = connectionMultiplexer ?? throw new ArgumentNullException(nameof(connectionMultiplexer));
//            _database = _connectionMultiplexer.GetDatabase();
//        }

//        public byte[]? Get(string key)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            RedisValue value = _database.StringGet(key);
//            return value.HasValue ? (byte[]?)value : null;
//        }

//        public async Task<byte[]?> GetAsync(string key, CancellationToken token = default)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            RedisValue value = await _database.StringGetAsync(key);
//            return value.HasValue ? (byte[]?)value : null;
//        }

//        public void Refresh(string key)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            var value = _database.StringGetWithExpiry(key);
//            if (value.Value.HasValue && value.Expiry.HasValue)
//            {
//                _database.KeyExpire(key, value.Expiry.Value);
//            }
//        }

//        public async Task RefreshAsync(string key, CancellationToken token = default)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            var value = await _database.StringGetWithExpiryAsync(key);
//            if (value.Value.HasValue && value.Expiry.HasValue)
//            {
//                await _database.KeyExpireAsync(key, value.Expiry.Value);
//            }
//        }

//        public void Remove(string key)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            _database.KeyDelete(key);
//        }

//        public async Task RemoveAsync(string key, CancellationToken token = default)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            await _database.KeyDeleteAsync(key);
//        }

//        public void Set(string key, byte[] value, DistributedCacheEntryOptions options)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            if (value == null)
//            {
//                throw new ArgumentNullException(nameof(value));
//            }

//            var expiry = GetExpiry(options);
//            _database.StringSet(key, value, expiry);
//        }

//        public async Task SetAsync(string key, byte[] value, DistributedCacheEntryOptions options, CancellationToken token = default)
//        {
//            if (string.IsNullOrEmpty(key))
//            {
//                throw new ArgumentNullException(nameof(key));
//            }

//            if (value == null)
//            {
//                throw new ArgumentNullException(nameof(value));
//            }

//            var expiry = GetExpiry(options);
//            await _database.StringSetAsync(key, value, expiry);
//        }

//        private static TimeSpan? GetExpiry(DistributedCacheEntryOptions options)
//        {
//            if (options.AbsoluteExpirationRelativeToNow.HasValue)
//            {
//                return options.AbsoluteExpirationRelativeToNow.Value;
//            }

//            if (options.AbsoluteExpiration.HasValue)
//            {
//                return options.AbsoluteExpiration.Value - DateTimeOffset.UtcNow;
//            }

//            if (options.SlidingExpiration.HasValue)
//            {
//                return options.SlidingExpiration.Value;
//            }

//            return null;
//        }
//    }
//}
