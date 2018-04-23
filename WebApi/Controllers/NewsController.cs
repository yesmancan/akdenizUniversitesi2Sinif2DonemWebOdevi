using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/News")]
    [EnableCors("MyPolicy")]
    public class NewsController : Controller
    {
        private readonly NewsSiteProjeContext context = new NewsSiteProjeContext();

        [HttpGet]
        public List<NEWS> GetAll()
        {
            return context.NEWS.OrderBy(c => c.NEWS_Date).ToList();
        }
        [Route("{id:int}")]
        public NEWS GetOne(long id)
        {
            return context.NEWS.Where(n => n.ID == id).SingleOrDefault();
        }

        [Route("{name}")]
        public List<NEWS> GetByName(string name)
        {
            return context.NEWS.Where(u =>
                u.NEWS_LABEL.Contains(name) ||
                u.NEWS_NAME.Contains(name) ||
                u.NEWS_CONTEXT.Contains(name) ||
                u.NEWS_HEADER.Contains(name)
            ).ToList();
        }
        [Route("cat/{id:int}")]
        public List<NEWS> GetOnlyCatNews(long id)
        {
            return context.NEWS.Where(n => n.NEWS_CAT == id).ToList();
        }
        [HttpPost]
        [Authorize]
        public NEWS Create([FromBody]NEWS news)
        {

            if (news.NEWS_IMG == null || news.NEWS_IMG.Length == 0)
                return new NEWS();

            news.NEWS_Date = DateTime.Now.ToString();
            context.NEWS.Add(news);
            context.SaveChanges();

            return news;
        }
        [HttpPut]
        [Authorize]
        public NEWS Put([FromBody]NEWS news)
        {
            NEWS nws = context.NEWS.Where(n => n.ID == news.ID).SingleOrDefault();
            nws.NEWS_CAT = news.NEWS_CAT;
            nws.NEWS_CONTEXT = news.NEWS_CONTEXT;
            nws.NEWS_Date = DateTime.Now.ToString();
            nws.NEWS_NAME = news.NEWS_NAME;
            nws.NEWS_LABEL = news.NEWS_LABEL;
            nws.NEWS_IMG = news.NEWS_IMG;
            nws.NEWS_EDITOR = news.NEWS_EDITOR;
            nws.NEWS_HEADER = news.NEWS_HEADER;
            if (news != null)
            {
                context.SaveChanges();
                return news;
            }
            return new NEWS();
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                var nNews = context.NEWS.Where(c => c.ID == id).SingleOrDefault();
                if (nNews == null)
                    return NotFound();

                context.NEWS.Remove(nNews);
                context.SaveChanges();

                return new NoContentResult();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}