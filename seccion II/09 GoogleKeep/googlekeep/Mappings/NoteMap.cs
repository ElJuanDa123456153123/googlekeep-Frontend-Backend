using FluentNHibernate.Mapping;
using googlekeep.Entity;

namespace googlekeep.Mappings
{
    public class NoteMap: ClassMap<Note>
    {
        public NoteMap()
        {
            Table("note");
            Id(x => x.id).Column("note_id").CustomType<int>()
                    .GeneratedBy.Custom<global::NHibernate.Id.IdentityGenerator>()
                    .UnsavedValue(null);
            Map(x => x.title);
            Map(x => x.content);
            Map(x => x.is_pinned);
            Map(x => x.is_archived);
            Map(x => x.activo);
            Map(x => x.usuario_id);
            Map(x => x.created_at);
            Map(x => x.updated_at);
        }
    }
}