using AutoMapper;
using back_end.Database;
using Microsoft.AspNetCore.Mvc;
using back_end.Classes;
using Microsoft.EntityFrameworkCore;
using OpenAI_API;
using OpenAI_API.Completions;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using OpenAI_API.Chat;
using System.Text;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;
using ChatRequest = back_end.Classes.ChatRequest;

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

                if (post != null)
                {
                        string content = "Generate a bed time story to uplift and motivate them if somebody story of the day is" + post.Content + ". with \"title: \" and \"content:\"";

                    ChatRequest chatRequest = new ChatRequest()
                    {
                        Model = modelname,
                        Messages = new List<Message>()
                        {
                         new Message()
                          {
                          Role = "user",
                          Content = content
                          }
                        }
                    };

                    Message gptResponse = await GetGPTResponse(chatRequest);


                    if (gptResponse != null)
                    {
                        string responseMessage = gptResponse.Content;
                        StoryRes story = ParseResponse(responseMessage);
                        return new Classes.Response<StoryRes>("Retrieved successfully", story, true);

                    }

                }
                StoryRes storyRes = new StoryRes();
                storyRes.Title = "Post not found";
                storyRes.Content = "Please enter your daily post in order to get the story";
                    return new Classes.Response<StoryRes>("No posts found", storyRes, true);
            
                
            }
            catch (Exception ex)
            {
                return new Classes.Response<StoryRes>(ex.Message, null, false);
            }

        }

        private async Task<Message> GetGPTResponse(ChatRequest jsonBody)
        {
            // Initialize an HTTP client to interact with the GPT API.
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(endpoint);
            client.DefaultRequestHeaders.Accept.Clear();

            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + key);

            // Prepare an HTTP request with the JSON body containing conversation history and the user's message.
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, client.BaseAddress);
            request.Content = new StringContent(JsonConvert.SerializeObject(jsonBody), Encoding.UTF8, "application/json");

            // Send the request and process the response.
            var response = await client.SendAsync(request).ConfigureAwait(false);
            var responseString = string.Empty;
            try
            {
                response.EnsureSuccessStatusCode();
                responseString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var responseJson = JObject.Parse(responseString);
                return JsonConvert.DeserializeObject<Message>(responseJson["choices"][0]["message"].ToString());
            }
            catch (HttpRequestException ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }

        }

        private StoryRes ParseResponse(string response)
        {
            StoryRes thisStory = new StoryRes();

            string[] parts = response.Split(new string[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries);

            // Assign the title and content to the StoryRes object
            if (parts.Length > 0)
            {
                thisStory.Title = parts[0].Replace("Title: ", "").Trim();
            }
            if (parts.Length > 1)
            {
                string originalString = string.Join("\n\n", parts.Skip(1)).Trim();
                string trimmedString = originalString.Substring(8);
                thisStory.Content = trimmedString;
            }

            return thisStory;
        }

        private string extractJsonFromMessage(string responseMessage)
        {
            // Regualr expression matching to extract the json part of the response message.
            string pattern = @"\{[^{}]+\}";
            Match match = Regex.Match(responseMessage, pattern);

            if (match.Success)
            {
                return match.Value;
            }
            else
            {
                // Handle the case where no JSON object is found
                return null;
            }
        }


    }

}
