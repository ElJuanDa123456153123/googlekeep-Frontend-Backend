using FluentNHibernate.Conventions;
using googlekeep.Business;
using googlekeep.Entity;
using googlekeep.WebApp.models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;


namespace googlekeep.WebApp.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UsuarioBusiness usuarioBusiness;
        public AuthenticationController()
        {
            usuarioBusiness = new UsuarioBusiness();
        }

        [Route("login")]
        [HttpPost]

        public IActionResult login([FromBody] AuthenticationModel entity)
        {
            // Validar que los campos no estén vacíos
            if (string.IsNullOrEmpty(entity.email) || string.IsNullOrEmpty(entity.password))
                return BadRequest("Email and password are required");

            // Verificar credenciales usando verifyCredential
            bool isValid = usuarioBusiness.verifyCredential(entity.email, entity.password);

            if (!isValid)
                return Unauthorized("Invalid credentials");

            // Obtener el usuario para retornar sus datos (sin password)
            var usuarios = usuarioBusiness.getAll();
            var usuario = usuarios.FirstOrDefault(u => u.email == entity.email);

            return Ok();
        }
    }
}
