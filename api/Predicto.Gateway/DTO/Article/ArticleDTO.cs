using Predicto.Database.Entities.Blog;

namespace Predicto.Gateway.DTO.Article
{
    public class ArticleDTO : ArticleListDTO
    {
        public ArticleDTO(ArticleEntity articleEntity) : base(articleEntity)
        {
        }
    }
}
