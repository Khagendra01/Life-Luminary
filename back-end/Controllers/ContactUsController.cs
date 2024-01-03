using AutoMapper;
using back_end.Database;
using Microsoft.AspNetCore.Mvc;
using back_end.Classes;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController: ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;

        public ContactUsController(ApplicationDBContext dBContext, IMapper mapper)
        {
            this._dbContext = dBContext;
            this._mapper = mapper;
        }

        [HttpPost("post")]
        public async Task<Response<bool>> AddContactUs(ContactUsReq newRequest)
        {
            try
            {
                ContactUs thisRequest = _mapper.Map<ContactUs>(newRequest);
                _dbContext.Add(thisRequest);
                await _dbContext.SaveChangesAsync();
                return new Response<bool>("Contact Support successfully added", true, true);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }
    }
}
