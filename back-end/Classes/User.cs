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

}
