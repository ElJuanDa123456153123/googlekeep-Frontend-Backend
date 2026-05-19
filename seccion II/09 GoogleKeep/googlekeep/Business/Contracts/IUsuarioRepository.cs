using googlekeep.Entity;

namespace googlekeep.Business.Contracts
{
    public interface IUsuarioRepository: IGenericRepository<Usuario>
    {
        // agregar mis metodos
        List<Usuario> getAll();
        bool verifyCredential(string email, string password);
    }
}
