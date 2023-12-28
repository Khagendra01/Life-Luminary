namespace back_end.Classes
{
    public class Story
    {
        public string ID { get; set; }
        public string Title { get; set; }

        public string Content { get; set; }

        public Story()
        {
            this.ID = Guid.NewGuid().ToString();
            this.Title = string.Empty;
            this.Content = string.Empty;

        }
    }
}
