using googlekeep.Business.Contracts;
using googlekeep.Data;
using googlekeep.Entity;

namespace googlekeep.Business
{
    public class NoteBusiness
    {
        private readonly INoteRepository repository;

        public NoteBusiness()
        {
            repository = new NoteRepository();
        }

        public List<Note> getAll()
        {
            return repository.getAll();
        }

        public int getLastId()
        {
            var notes = repository.getAll();
            return notes.Any() ? notes.Max(n => n.id) : 0;
        }

        public Note getById(int id)
        {
            return repository.GetById(id);
        }

        public void delete(Note entity)
        {
            repository.Delete(entity);
        }

        public Note SaveOrUpdate(Note entity)
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
    }
}