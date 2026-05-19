using googlekeep.Business.Contracts;
using googlekeep.Entity;
using System.Linq;

namespace googlekeep.Data
{
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        public List<Usuario> getAll()
        {
            var result = Session.Query<Usuario>().ToList();
            return result;
        }

        public bool verifyCredential(string email, string password)
        {
            var allUsers = Session.Query<Usuario>().ToList();

            var usuario = allUsers.Where(u => u.email == email && u.password == password).FirstOrDefault();

            return usuario != null;
        }
    }
}
