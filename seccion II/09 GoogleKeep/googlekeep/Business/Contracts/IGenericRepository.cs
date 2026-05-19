namespace googlekeep.Business.Contracts
{
    public interface IGenericRepository<T>
    {
        T GetById(int Id);
        T Save(T entity);
        T Update(T entity);
        void Delete(T t);
    }
}
