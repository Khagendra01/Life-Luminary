namespace back_end.Classes
{
    public class LoginInfo
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public LoginInfo()
        {
            this.Username = string.Empty;
            this.Password = string.Empty;
        }

    }
}
