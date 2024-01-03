using back_end.Classes;

namespace back_end.Classes
{
    public class Post
    {
        public string Id { get; set; }
        public string UserID { get; set; }
        public string Content { get; set; }
        public string DateTime {  get; set; }
        public bool IsNameHidden { get; set; }
        public List<UserReact> UserReactions { get; set; }
        public virtual User User { get; set; }
        public Post()
        {
            this.Id = Guid.NewGuid().ToString();
        }   

    }

    public class PostRequest
    {
        public string UserID { get; set; }
        public string DateTime { get; set; }
        public string Content { get; set; }
        public bool IsNameHidden { get; set; }

    }

    public class PostReact
    {
        public string UserID { get; set; }
        public string PostID { get; set; }

        public bool isGoodJob { get; set; }
        public bool isLove { get; set; }


    }

    public class ReactResponse
    {
        public int GoodJob { get; set; }
        public int Love { get; set; }

    }

    public class EachReact
    {
        public string UserId { get; set; }
        public string PostId { get; set; }
    }

    public class EachReactResponse
    {
        public bool GoodJob { get; set; }
        public bool Love { get; set; }
    }
}
