using AutoMapper;
using back_end.Classes;
using back_end.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    public class ProfileController : Controller
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;

        public ProfileController(ApplicationDBContext dBContext, IMapper mapper)
        {
            this._dbContext = dBContext;
            this._mapper = mapper;
        }

        [HttpGet("bio")]
        public async Task<Response<string>> GetBio([FromQuery] string userId)
        {
            try
            {
                string res = "no";

                // Return the list of posts in the response
                return new Response<string>("retrieved succesfully", res, true);
            }
            catch (Exception ex)
            {
                return new Response<string>(ex.Message, null, false);
            }
        }
    }
}
