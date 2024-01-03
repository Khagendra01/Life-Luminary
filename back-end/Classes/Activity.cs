using System.ComponentModel.DataAnnotations;

namespace back_end.Classes
{
    public class ActivityReq
    {
        public string UserId { get; set; }
        public string DateTime { get; set; }
    }

    public class StoryRes
    {

        public string Title { get; set; }

        public string Content { get; set; }

        public StoryRes()
        {

            this.Title = string.Empty;
            this.Content = string.Empty;

        }
    }

    public class Message
    {
        public string Content { get; set; }
        public string Role { get; set; }

    }
}
