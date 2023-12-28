namespace back_end.Classes
{
    public class RegisterInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public RegisterInfo()
        {
            FirstName = string.Empty;
            LastName = string.Empty;   
            Email = string.Empty;
            UserName = string.Empty;
            Password = string.Empty;
            ConfirmPassword = string.Empty;
        }

    }
}
