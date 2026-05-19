namespace googlekeep.WebApp.models
{
    public class UsuarioModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }

    public class AuthenticationModel
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}