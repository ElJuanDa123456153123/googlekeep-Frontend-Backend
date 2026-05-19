using googlekeep.Business.Contracts;
using googlekeep.Entity;

namespace googlekeep.Data
{
    public class NoteRepository : GenericRepository<Note>, INoteRepository
    {
        public List<Note> getAll()
        {
            var result = Session.Query<Note>().ToList();
            return result;
        }
    }
}