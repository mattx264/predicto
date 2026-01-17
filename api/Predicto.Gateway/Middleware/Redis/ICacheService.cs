namespace Predicto.Gateway.Middleware.Redis
{
    public interface ICacheService
    {
        string? GetString(string key);
        void SetString(string key, string value,int? absoluteExpirationSec);
        //void Set<T>(string key, T value, TimeSpan? absoluteExpiration = null);
        //bool TryGet<T>(string key, out T value);
        //void Remove(string key);
    }
}
