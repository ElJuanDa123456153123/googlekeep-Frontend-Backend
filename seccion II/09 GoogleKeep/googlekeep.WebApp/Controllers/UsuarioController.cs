using googlekeep.Business;
using googlekeep.Entity;
using googlekeep.WebApp.models;
using Microsoft.AspNetCore.Mvc;


namespace googlekeep.WebApp.Controllers
{
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioBusiness usuarioBusiness;
        public UsuarioController()
        {
            usuarioBusiness = new UsuarioBusiness();
        }
        // GET: api/<ValuesController>
        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = usuarioBusiness.getAll();
            return Ok(result);
        }

        [Route("save")]
        [HttpPost]

        public IActionResult SaveOrUpdate([FromBody] UsuarioModel entity)
        {
            var usuario = new Usuario
            {
                id = entity.id,
                name = entity.name,
                email = entity.email,
                password = entity.password
            };
            var result = usuarioBusiness.SaveOrUpdate(usuario);
            return Ok(result);
        }
        
        // SaveOrUpdate

        // Delete

        // GetById

        //// GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<ValuesController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ValuesController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ValuesController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
