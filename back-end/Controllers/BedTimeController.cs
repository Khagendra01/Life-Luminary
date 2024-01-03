using AutoMapper;
using back_end.Database;
using Microsoft.AspNetCore.Mvc;
using back_end.Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Azure.AI.OpenAI;
using Azure;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BedTimeController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly string endpoint;
        private readonly string key;
        private readonly string modelname;
        public BedTimeController(ApplicationDBContext dBContext, IMapper mapper, IConfiguration configuration)
        {
            this._dbContext = dBContext;
            this._mapper = mapper;
            endpoint = configuration["OpenAIConfig:endpoint"];
            key = configuration["OpenAIConfig:apikey"];
            modelname = configuration["OpenAIConfig:modelname"];
        }

        [HttpGet("story")]
        public async Task<Classes.Response<StoryRes>> getStory([FromQuery] ActivityReq actReq)
        {
            try
            {
                Post post = await _dbContext.Post.FirstOrDefaultAsync(u => u.UserID == actReq.UserId && u.DateTime == actReq.DateTime);

                List<Message> messages = new List<Message>();  

                Message newMessage = new Message();
                newMessage.Role = "user";
                newMessage.Content = "Generate a story if somebody story of the day is It was really awfulday. with \"title: \" and \"content:\"";

                messages.Add(newMessage);


                if (post != null)
                {
                    StoryRes story = new StoryRes()
                    {
                        Title= "This is title",
                        Content= "This is content"
                    };
                    return new Classes.Response<StoryRes>("Retrieved successfully", story, true);
                }
                else
                {
                    return new Classes.Response<StoryRes>("No posts found", null, true);
                }
            }
            catch (Exception ex)
            {
                return new Classes.Response<StoryRes>(ex.Message, null, false);
            }

        }

         private StoryRes ParseResponse(string response)
        {
            StoryRes thisStory = new StoryRes();

            // Split the response into lines
            string[] lines = response.Split('\n');

            foreach (string line in lines)
            {
                // Split each line into key and value
                string[] parts = line.Split(':');
                if (parts.Length == 2)
                {
                    string key = parts[0].Trim();
                    string value = parts[1].Trim();

                    // Assign values to the Explore object based on the key
                    switch (key)
                    {
                        case "Title":
                            thisStory.Title = value;
                            break;
                        case "Content":
                            thisStory.Content = value;
                            break;
                            // Add more cases for additional keys if needed
                    }
                }
            }

            return thisStory;
        }

        private StoryRes GetStoryFromAI(List<Message> messages)
        {
            try
            {
                List<ChatMessage> chatMessages = _mapper.Map<List<ChatMessage>>(messages);
                OpenAIClient client = new(new Uri(endpoint), new AzureKeyCredential(key));
                var chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);
                var response = client.GetChatCompletions(deploymentOrModelName: modelname, chatCompletionsOptions);


                StoryRes exploreInfo = ParseResponse(response.Value.Choices[0].Message.Content);


                return exploreInfo;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }

}
