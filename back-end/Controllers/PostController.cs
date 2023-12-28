using AutoMapper;
using back_end.Database;
using back_end.Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;

        public PostController(ApplicationDBContext dBContext, IMapper mapper)
        {
            this._dbContext = dBContext;
            this._mapper = mapper;
        }

        [HttpPost("post")]
        public async Task<Response<bool>> AddPost(PostRequest postRequest)
        {
            try
            {
                // can be done later Post? post = await _dbContext.Post.FirstOrDefaultAsync();

                Post post = _mapper.Map<Post>(postRequest);
                _dbContext.Add(post);
                await _dbContext.SaveChangesAsync();
                return new Response<bool>("Post successfully added", true, true);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }

        }

        [HttpPost("react")]
        public async Task<Response<bool>> AddReact(PostReact postReact)
        {
            try
            {
                UserReact post = _mapper.Map<UserReact>(postReact);
                _dbContext.Add(post);
                await _dbContext.SaveChangesAsync();
                return new Response<bool>("reacted successfully", true, true);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }
    }
}
