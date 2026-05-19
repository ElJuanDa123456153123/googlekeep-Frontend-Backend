using googlekeep.Business;
using googlekeep.Entity; // ← Agregar este using

namespace googlekeep.test
{
    public class BasicTest
    {
        public readonly UsuarioBusiness usuarioBusiness;

        public BasicTest()
        {
            usuarioBusiness = new UsuarioBusiness();
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestGetAll()
        {
            var result = usuarioBusiness.getAll();
            if (result.Count != 0)
                Assert.Pass("Success");
            else
                Assert.Fail("Failed");
        }

        [Test]

        public void TestGetLastId()
        {
            var result = usuarioBusiness.getLastId();
            if (result != 0)
                Assert.Pass("Success");
            else
                Assert.Fail("Failed");
        }
        [Test]
        public void TestGetById()
        {
            var usuario = usuarioBusiness.getAll().FirstOrDefault();
            var result2 = usuarioBusiness.getById(usuario!.id);
            if (result2.id != 0)
                Assert.Pass("Success");
            else
                Assert.Fail("Failed");
        }

        [Test]
        public void TestDelete()
        {
            // var usuario = usuarioBusiness.getAll().FirstOrDefault();
            var usuarioId = usuarioBusiness.getLastId();
            usuarioBusiness.delete(new Usuario() { id = usuarioId });
            var result = usuarioBusiness.getById(usuarioId);
                if (result == null)
                    Assert.Pass("Success");
                else
                    Assert.Fail("Failed: El usuario no fue eliminado");
        }
        [Test]
        public void TestSaveOrUpdate()
        {
            var nuevoUsuario = new Usuario()
            {
                name = "Juan Pérez",
                email = "juan@example.com",
                password = "123456"
            };

            var result = usuarioBusiness.SaveOrUpdate(nuevoUsuario);

            if (result.id != 0)
                Assert.Pass("Success");
            else
                Assert.Fail("Failed");
        }
    }
}