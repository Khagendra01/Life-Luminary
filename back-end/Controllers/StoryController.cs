using AutoMapper;
using back_end.Database;
using Microsoft.AspNetCore.Mvc;
using back_end.Classes;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoryController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;

        public StoryController(ApplicationDBContext dBContext, IMapper mapper)
        {
            this._dbContext = dBContext;
            this._mapper = mapper;
        }

        private Story GetStory()
        {
            Story story = new Story();
            return story;
        }

        [HttpGet()]
        public async Task<Response<bool>> AddContactUs()
        {
            try
            {
                Story newStory = GetStory();
                _dbContext.Add(newStory);
                await _dbContext.SaveChangesAsync();
                return new Response<bool>("Story Retrieved", true, true);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }
    }
}
