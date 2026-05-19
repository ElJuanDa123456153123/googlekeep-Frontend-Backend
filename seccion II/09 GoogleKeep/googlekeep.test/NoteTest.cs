using googlekeep.Business;
using googlekeep.Entity;

namespace googlekeep.test
{
    public class NoteTest
    {
        public readonly NoteBusiness noteBusiness;

        public NoteTest()
        {
            noteBusiness = new NoteBusiness();
        }

        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void TestGetAll()
        {
            var result = noteBusiness.getAll();
            if (result.Count >= 0)
                Assert.Pass("Success");
            else
                Assert.Fail("Failed");
        }

        [Test]
        public void TestGetLastId()
        {
            var result = noteBusiness.getLastId();
            if (result >= 0)
                Assert.Pass($"Success: Last ID = {result}");
            else
                Assert.Fail("Failed");
        }

        [Test]
        public void TestGetById()
        {
            var note = noteBusiness.getAll().FirstOrDefault();
            if (note != null)
            {
                var result = noteBusiness.getById(note.id);
                if (result.id != 0)
                    Assert.Pass("Success");
                else
                    Assert.Fail("Failed");
            }
            else
            {
                Assert.Ignore("No se encontro la nota de test");
            }
        }

        [Test]
        public void TestSaveOrUpdate()
        {
            var nuevaNota = new Note()
            {
                title = "Nota de prueba 456456",
                content = "Contenido de prueba 456456",
                is_pinned = false,
                is_archived = false,
                activo = true,
                usuario_id = 1
            };

            var result = noteBusiness.SaveOrUpdate(nuevaNota);

            if (result.id != 0)
                Assert.Pass($"Success: Note created with ID {result.id}");
            else
                Assert.Fail("Failed");
        }

        [Test]
        public void TestDelete()
        {
            var noteId = noteBusiness.getLastId();
            if (noteId > 0)
            {
                noteBusiness.delete(new Note() { id = noteId });
                var result = noteBusiness.getById(noteId);
                if (result == null)
                    Assert.Pass("Success: Note deleted");
                else
                    Assert.Fail("Failed: La nota no fue eliminada");
            }
            else
            {
                Assert.Ignore("No se encontro la nota de test para eliminar");
            }
        }
    }
}