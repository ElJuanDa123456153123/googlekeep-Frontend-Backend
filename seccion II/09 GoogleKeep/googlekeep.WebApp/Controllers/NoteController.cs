using googlekeep.Business;
using googlekeep.Entity;
using googlekeep.WebApp.models;
using Microsoft.AspNetCore.Mvc;

namespace googlekeep.WebApp.Controllers
{
    [Route("api/note")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly NoteBusiness noteBusiness;

        public NoteController()
        {
            noteBusiness = new NoteBusiness();
        }

        // GET: api/note/getAll
        [Route("getAll")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = noteBusiness.getAll();
            return Ok(result);
        }

        // GET: api/note/getById/{id}
        [Route("getById/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            var result = noteBusiness.getById(id);
            if (result == null)
                return NotFound($"Note with id {id} not found");
            return Ok(result);
        }

        // POST: api/note/save
        [Route("save")]
        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody] NoteModel entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var note = new Note
            {
                id = entity.id,
                title = entity.title,
                content = entity.content,
                is_pinned = entity.is_pinned,
                is_archived = entity.is_archived,
                activo = entity.activo,
                usuario_id = entity.usuario_id
            };

            var result = noteBusiness.SaveOrUpdate(note);
            return Ok(result);
        }

        // DELETE: api/note/delete/{id}
        [Route("delete/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var note = noteBusiness.getById(id);
            if (note == null)
                return NotFound($"Note with id {id} not found");

            noteBusiness.delete(note);
            return Ok(new { message = $"Note {id} deleted successfully" });
        }
    }
}
