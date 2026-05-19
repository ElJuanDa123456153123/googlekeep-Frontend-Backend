namespace googlekeep.Entity
{
    public interface IEntity
    {
        int id { get; set; }
        DateTime created_at { get; set; }
        DateTime? updated_at { get; set; }
    }
}
