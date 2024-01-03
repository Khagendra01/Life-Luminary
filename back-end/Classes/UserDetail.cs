using System.ComponentModel.DataAnnotations;

namespace back_end.Classes 
{
    public class UserDetail
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email{ get; set; }
        public string AccessToken { get; set; }

        public UserDetail()
        {
            this.Id = string.Empty; 
            this.FirstName = string.Empty;
            this.LastName = string.Empty;
            this.UserName = string.Empty;
            this.Email = string.Empty;
            this.AccessToken = string.Empty;
        }

    }

    public class UserProfileView
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class UserReact
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string PostId { get; set; }
        public bool isGoodJob { get; set; }
        public bool isLove {  get; set; }

        public UserReact()
        {
            this.Id = Guid.NewGuid().ToString();
            this.isGoodJob = false;
            this.isLove = false;
        }

    }
}
