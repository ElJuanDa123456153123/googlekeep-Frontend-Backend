using googlekeep.Business.Contracts;
using googlekeep.Data;
using googlekeep.Entity;
using System.Linq;

namespace googlekeep.Business
{
    public class UsuarioBusiness
    {
        private readonly IUsuarioRepository repository;
        public UsuarioBusiness()
        {
            repository = new UsuarioRepository();
        }

        public List<Usuario> getAll()
        {
            return repository.getAll();
        }

        public int getLastId()
        {
            var usuarios = repository.getAll();
            return usuarios.Any() ? usuarios.Max(u => u.id) : 0;
        }

        public Usuario getById(int id)
        {
            return repository.GetById(id);
        }

        public void delete(Usuario entity)
        {
            repository.Delete(entity);
        }

        public Usuario SaveOrUpdate(Usuario entity)
            {
                if (entity.id == 0)
                {
                    entity.created_at = DateTime.Now;
                    entity.updated_at = DateTime.Now;
                    return repository.Save(entity);
                }
                else
                {
                    entity.updated_at = DateTime.Now;
                    return repository.Update(entity);
                }
            }

        public bool verifyCredential(string email, string password)
        {
            return repository.verifyCredential(email, password);
        }
    }
}
