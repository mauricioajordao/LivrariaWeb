using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using LivrariaDAL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LivrariaWebApi.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class AssuntoController : ControllerBase
    {
        public LivrariaDBEntities ContextoLivraria { get; private set; }
        public AssuntoController()
        {
            ContextoLivraria = new LivrariaDBEntities();
        }



        // GET: api/<AssuntoController>
        [HttpGet]
        public ActionResult ObterComId(int id)
        {
            return new JsonResult(ContextoLivraria.assuntoes.Find(id));
           
        }

        // GET api/<AssuntoController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            return new JsonResult(ContextoLivraria.assuntoes.Find(id));

        }

        // POST api/<AssuntoController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AssuntoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AssuntoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
