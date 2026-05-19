namespace googlekeep.WebApp.models
{
    public class NoteModel
    {
        public int id { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public bool is_pinned { get; set; }
        public bool is_archived { get; set; }
        public bool activo { get; set; }
        public int usuario_id { get; set; }
    }
}
