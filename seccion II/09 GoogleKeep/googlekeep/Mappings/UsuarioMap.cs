using FluentNHibernate.Mapping;
using googlekeep.Entity;

namespace googlekeep.Mappings
{
    public class UsuarioMap: ClassMap<Usuario>
    {
        public UsuarioMap()
        {
            Table("usuario");
            Id(x => x.id).Column("usuario_id").CustomType<int>()
                    .GeneratedBy.Custom<global::NHibernate.Id.IdentityGenerator>()
                    .UnsavedValue(null);
            Map(x => x.name);
            // add all properties of the Person class here
            Map(x => x.email);
            Map(x => x.password);
            Map(x => x.created_at);
            Map(x => x.updated_at);
        }
    }
}
