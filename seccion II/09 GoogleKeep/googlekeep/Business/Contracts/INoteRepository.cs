using googlekeep.Entity;

namespace googlekeep.Business.Contracts
{
    public interface INoteRepository: IGenericRepository<Note>
    {
        // agregar mis metodos
        List<Note> getAll();
    }
}