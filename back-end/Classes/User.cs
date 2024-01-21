using Microsoft.AspNetCore.Identity;
using back_end.Classes;

namespace back_end.Classes
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<Post> Posts { get; set; }

        public User()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
        }

    }

    public class GoogleUserInfo
    {
        public string Sub { get; set; }
        public string Name { get; set; }
        public string Given_Name { get; set; }
        public string Family_Name { get; set; }
        public string Picture { get; set; }
        public string Email { get; set; }
        public bool Email_Verified { get; set; }
        public string Locale { get; set; }
    }


}
