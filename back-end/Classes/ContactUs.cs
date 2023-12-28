namespace back_end.Classes
{
    public class ContactUs
    {
        public string ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Message { get; set; }

        public ContactUs() 
        {
            this.ID = Guid.NewGuid().ToString();
            this.FirstName = string.Empty;
            this.LastName = string.Empty;
            this.Email = string.Empty;
            this.Message = string.Empty;
        }
    }
}
