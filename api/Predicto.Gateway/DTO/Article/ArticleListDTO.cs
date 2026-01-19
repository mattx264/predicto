using Predicto.Database.Entities.Blog;
using Predicto.Database.Entities.Sport;

namespace Predicto.Gateway.DTO.Article
{
    public class ArticleListDTO
    {
        public ArticleListDTO(ArticleEntity articleEntity)
        {
            Id = articleEntity.Id;
            Slug = articleEntity.Slug;
            Title = articleEntity.Title;
            ShortDescription = articleEntity.ShortDescription;
            Author = articleEntity.Author;
            Tag = articleEntity.Tag;
            Content = articleEntity.Content;
            TournamentId = articleEntity.TournamentId;
            IsActive = articleEntity.IsActive;
            CreatedDate = articleEntity.CreatedDate;
            CreatedBy = articleEntity.CreatedBy;
        }
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Author { get; set; }
        public DateTime CreateOn { get; set; }
        public  string Tag { get; set; }
        public  string Content { get; set; } // <p>...</p><h2>...</h2>
        public int? TournamentId { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public int ModifiedBy { get; set; }
    }
}
