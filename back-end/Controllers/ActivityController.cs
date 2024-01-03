using AutoMapper;
using back_end.Classes;
using back_end.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController: ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;
        public ActivityController(ApplicationDBContext dBContext, IMapper mapper)
        {
            this._dbContext = dBContext;
            this._mapper = mapper;
        }

        [HttpGet("post")]
        public async Task<Response<List<Post>>> GetUserPosts([FromQuery] string userId)
        {
            try
            {
                List<Post> posts = await _dbContext.Post.Where(u => u.UserID == userId).ToListAsync();

                if (posts != null && posts.Any())
                {
                    return new Response<List<Post>>("Retrieved successfully", posts, true);
                }
                else
                {
                    return new Response<List<Post>>("No posts found", new List<Post>(), true);
                }
            }
            catch (Exception ex)
            {
                return new Response<List<Post>>(ex.Message, null, false);
            }
        }

        [HttpGet("eachPost")]
        public async Task<Response<Post>> GetUserPost([FromQuery] ActivityReq actReq)
        {
            try
            {
                Post post = await _dbContext.Post.FirstOrDefaultAsync(u => u.UserID == actReq.UserId && u.DateTime == actReq.DateTime);

                if (post != null)
                {
                    return new Response<Post>("Retrieved successfully", post, true);
                }
                else
                {
                    return new Response<Post>("No posts found", new Post(), true);
                }
            }
            catch (Exception ex)
            {
                return new Response<Post>(ex.Message, null, false);
            }
        }

        [HttpGet("profileView")]
        public async Task<Response<UserProfileView>> GetUserView([FromQuery] string userId)
        {
            try
            {
                User? getUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);

                UserProfileView newView = _mapper.Map<UserProfileView>(getUser);

                return new Response<UserProfileView>("user view retrieved", newView, true);
            }
            catch (Exception ex)
            {
                return new Response<UserProfileView>(ex.Message, null, false);
            }
        }

    }
}
