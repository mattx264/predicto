using Predicto.Database.Entities.Sport;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.Database.Entities.Blog
{
    public class ArticleEntity
    {
        public int Id { get; set; }
        public required string Slug { get; set; }
        public required string Title { get; set; }
        public required string ShortDescription { get; set; }
        public required string Author { get; set; }
        public DateTime CreateOn { get; set; }
        public required string Tag { get; set; }
        public required string Content { get; set; } // <p>...</p><h2>...</h2>
        public int? TournamentId { get; set; }
        public virtual TournamentEntity? Tournament { get; set; }
    }
}
