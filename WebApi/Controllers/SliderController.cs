using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/Slider")]
    public class SliderController : Controller
    {
        private readonly NewsSiteProjeContext context = new NewsSiteProjeContext();

        [HttpGet]
        public List<SLIDER> GetAll()
        {
            return context.SLIDER.OrderBy(c => c.date).ToList();
        }
        [HttpGet("{id}")]
        [Route("OnlyOne")]
        public SLIDER GetOne(long id)
        {
            return context.SLIDER.Where(n => n.id == id).SingleOrDefault();
        }

        [HttpGet("{id}")]
        [Route("NewsByCats")]
        public List<SLIDER> GetOnlyLabelNews(long id)
        {
            return context.SLIDER.Where(n => n.label == id.ToString()).ToList();
        }
        [HttpPost]
        [Authorize]
        public SLIDER Create([FromBody]SLIDER slider)
        {

            if (context.SLIDER.Where(c => c.name == slider.name || c.id == slider.id).Count() > 0)
                return new SLIDER();

            slider.date = DateTime.Now.ToString();

            context.SLIDER.Add(slider);
            context.SaveChanges();

            return slider;

        }
        [HttpPut]
        [Authorize]
        public SLIDER Put([FromBody]SLIDER slider)
        {
            SLIDER slder = context.SLIDER.Where(c => c.id == slider.id).SingleOrDefault();
            if (slder != null)
            {
                slder.active = true;
                slder.img = slider.img;
                slder.header = slider.header;
                slder.text = slider.text;
                slder.label = slider.label;
                slder.name = slider.name;
                slder.editor = slider.editor;
                slder.date = DateTime.Now.ToString();
                context.SaveChanges();
                return slder;
            }
            return new SLIDER();
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                var Del = context.SLIDER.Where(c => c.id == id).SingleOrDefault();
                if (Del == null)
                    return NotFound();

                context.SLIDER.Remove(Del);
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