using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using System.Linq;
using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace AngularAndDonetCoreProjet.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class CategoryController : Controller
    {
        private readonly NewsSiteProjeContext context = new NewsSiteProjeContext();

        [HttpGet]
        public List<CATEGORY> GetAll()
        {
            return context.CATEGORY.OrderBy(c => c.Lvl).ToList();
        }

        [HttpPost]
        [Authorize]
        public CATEGORY Create([FromBody]CATEGORY cat)
        {

            if (context.CATEGORY.Where(c => c.Name == cat.Name || c.ID == cat.ID).Count() > 0)
                return new CATEGORY();

            cat.Date=DateTime.Now;

            context.CATEGORY.Add(cat);
            context.SaveChanges();

            return cat;

        }
        [HttpPut]
        [Authorize]
        public CATEGORY Put([FromBody]CATEGORY cat)
        {
            CATEGORY ct = context.CATEGORY.Where(c => c.ID == cat.ID).SingleOrDefault();
            if (ct != null)
            {
                ct.Lvl = cat.Lvl;
                ct.Name = cat.Name;
                ct.Date = DateTime.Now;
                context.SaveChanges();
                return cat;
            }
            return new CATEGORY();
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                var nCat = context.CATEGORY.Where(c => c.ID == id).SingleOrDefault();
                if (nCat == null)
                    return NotFound();

                context.CATEGORY.Remove(nCat);
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
