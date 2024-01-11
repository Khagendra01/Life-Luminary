using Newtonsoft.Json;
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

    public class ChatRequest
    {

        [JsonProperty("model")]

        public string? Model { get; set; }     // Property to store the AI model used for conversation.

        [JsonProperty("messages")]

        public List<Message> Messages { get; set; }
    }

    // Define a class named Message to represent a single message in a conversation.
    public class Message
    {
        [JsonProperty("role")]
        public string Role { get; set; }

        [JsonProperty("content")]

        public string Content { get; set; }
    }

    public class ValidationModel
    {
        public string valid { get; set; }
    }
}
