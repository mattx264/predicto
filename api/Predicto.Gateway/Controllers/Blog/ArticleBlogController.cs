using Microsoft.AspNetCore.Mvc;
using Predicto.Database.Interfaces;
using Predicto.Database.UnitOfWork;
using Predicto.Gateway.Services;

namespace Predicto.Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleBlogController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ArticleBlogController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAllArticles()
        {
            var articles = await _unitOfWork.Article.GetAllAsync();
            return Ok(articles);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticleById(int id)
        {
            var article = await _unitOfWork.Article.GetByIdAsync(id);
            if (article == null)
            {
                return NotFound();
            }
            return Ok(article);
        }

    }
}
