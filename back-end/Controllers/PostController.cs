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
                Post getPost = await _dbContext.Post.FirstOrDefaultAsync(u => u.UserID == postRequest.UserID && u.DateTime == postRequest.DateTime);

                if (getPost != null)
                {
                    getPost.Content = postRequest.Content;
                    getPost.DateTime = postRequest.DateTime;
                    getPost.IsNameHidden = postRequest.IsNameHidden;

                    _dbContext.Update(getPost);
                    await _dbContext.SaveChangesAsync();
                    return new Response<bool>("Post updated succesfully", true, true);
                }
                else
                {
                    Post post = _mapper.Map<Post>(postRequest);
                    _dbContext.Add(post);
                    await _dbContext.SaveChangesAsync();
                    return new Response<bool>("Post successfully added", true, true);
                }

               
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
                // Check if a record with the given UserId and PostId already exists
                UserReact existingPost = _dbContext.UserReact
                    .SingleOrDefault(p => p.UserId == postReact.UserID && p.PostId == postReact.PostID);

                if (existingPost != null)
                {
                    if (postReact.Change == "goodJob")
                    {
                        existingPost.isGoodJob = !existingPost.isGoodJob;
                    }
                    else
                    {
                        existingPost.isLove = !existingPost.isLove;
                    }                
                    _dbContext.Update(existingPost);
                }
                else
                {
                    // If the record does not exist, add a new one
                    UserReact newPost = _mapper.Map<UserReact>(postReact);
                    _dbContext.Add(newPost);
                }

                await _dbContext.SaveChangesAsync();
                return new Response<bool>("Reacted successfully", true, true);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }


        [HttpGet("post")]
        public async Task<Response<List<Post>>> GetPosts()
        {
            try
            {
                List<Post> posts = await _dbContext.Post
                    .OrderByDescending(p => p.DateTime)
                    .ToListAsync();

                // Return the list of posts in the response
                return new Response<List<Post>>("retrieved succesfully", posts, true);
            }
            catch (Exception ex)
            {
                return new Response<List<Post>>(ex.Message, null, false);
            }
        }

        [HttpGet("getReact")]
        public async Task<Response<ReactResponse>> GetPostReact([FromQuery] string postId)
        {
            try
            {
                ReactResponse newRes = new ReactResponse();
                int goodJobCount = await _dbContext.UserReact
               .Where(u => u.PostId == postId && u.isGoodJob)
               .CountAsync();

                int loveCount = await _dbContext.UserReact
                    .Where(u => u.PostId == postId && u.isLove)
                    .CountAsync();

                newRes.GoodJob = goodJobCount;
                newRes.Love = loveCount;

                // Return the response
                return new Response<ReactResponse>("Retrieved successfully", newRes, true);
            }
            catch (Exception ex)
            {
                return new Response<ReactResponse>(ex.Message, null, false);
            }
        }

        [HttpGet("getEachReact")]
        public async Task<Response<EachReactResponse>> GetEachReact([FromQuery] EachReact reactRequest)
        {
            try
            {
                EachReactResponse newRes = new EachReactResponse();
                var userReact = await _dbContext.UserReact
            .FirstOrDefaultAsync(x => x.UserId == reactRequest.UserId && x.PostId == reactRequest.PostId);

                if (userReact != null)
                {
                    // Set values in newRes
                    newRes.GoodJob = userReact.isGoodJob;
                    newRes.Love = userReact.isLove;
                }else
                {
                    newRes.GoodJob = false;
                    newRes.Love = false;
                }

                // Return the response
                return new Response<EachReactResponse>("Retrieved successfully", newRes, true);
            }
            catch (Exception ex)
            {
                return new Response<EachReactResponse>(ex.Message, null, false);
            }
        }


    }
}
