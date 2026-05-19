namespace googlekeep.Entity
{
    public class Usuario: IEntity
    {
        public virtual int id { get; set; }
        public virtual string name { get; set; }
        public virtual string email { get; set; }
        public virtual string password { get; set; }
        public virtual DateTime created_at { get; set; }
        public virtual DateTime? updated_at { get; set; }
    }
}
