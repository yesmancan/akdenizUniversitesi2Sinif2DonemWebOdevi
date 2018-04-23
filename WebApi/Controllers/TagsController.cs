using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/Tags")]
    [EnableCors("MyPolicy")]
    public class TagsController : Controller
    {
        private readonly NewsSiteProjeContext context = new NewsSiteProjeContext();

        [HttpGet]
        public List<TAGS> GetAll()
        {
            return context.TAG.OrderBy(c => c.CREATE_DATE).ToList();
        }

        [HttpPost]
        [Authorize]
        public TAGS Create([FromBody]TAGS tag)
        {

            if (context.TAG.Where(c => c.NAME == tag.NAME || c.ID == tag.ID).Count() > 0)
                return new TAGS();

            tag.CREATE_DATE = DateTime.Now.ToString();

            context.TAG.Add(tag);
            context.SaveChanges();

            return tag;

        }
        [HttpPut]
        [Authorize]
        public TAGS Put([FromBody]TAGS tag)
        {
            TAGS tg = context.TAG.Where(c => c.ID == tag.ID).SingleOrDefault();
            if (tg != null)
            {
                tg.NAME = tag.NAME;
                tg.CREATE_DATE = DateTime.Now.ToString();
                context.SaveChanges();
                return tag;
            }
            return new TAGS();
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                var nCat = context.TAG.Where(c => c.ID == id).SingleOrDefault();
                if (nCat == null)
                    return NotFound();

                context.TAG.Remove(nCat);
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