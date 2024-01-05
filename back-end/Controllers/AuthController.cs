using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using back_end.Classes;
using back_end.Database;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using back_end.Services;
using back_end.Models;
using Newtonsoft.Json.Linq;
using System.Net;

namespace ProfessorAIAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<User> userManager, 
            SignInManager<User> signInManager, IConfiguration configuration,
            IMapper mapper, IEmailService emailService)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._configuration = configuration;
            this._mapper = mapper;
            this._emailService = emailService;

        }

        [HttpPost("register")]
        public async Task<Response<bool>> Register(RegisterInfo info)
        {
            try
            {
                IdentityUser? existingUser = await _userManager.FindByEmailAsync(info.Email);
                if (existingUser is not null)
                {
                    return new Response<bool>("User already exists", false, false);
                }

                existingUser = await _userManager.FindByNameAsync(info.UserName);
                if (existingUser != null)
                {
                    return new Response<bool>("Username already exists", false, false);
                }

                User user = _mapper.Map<User>(info);

                var result = await _userManager.CreateAsync(user, info.Password);


                if (result.Succeeded)
                {
                    //Add Token to Verify the email ....
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/Auth/ConfirmEmail?token={WebUtility.UrlEncode(token)}&email={WebUtility.UrlEncode(user.Email)}";
                    var message = new back_end.Models.Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);
                    _emailService.SendEmail(message);
                    return new Response<bool>("User created and email sent succesfully", true, true);
                }
                var errorMessages = result.Errors.Select(error => error.Description);
                string detailedError = string.Join(", ", errorMessages);

                return new Response<bool>(detailedError, false, false);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }


        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {

            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {

                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {

                    return StatusCode(StatusCodes.Status200OK,
                    new Response<string>("Email Verified Successfully", "Sucess", true));
                }         
            }
            return StatusCode(StatusCodes.Status200OK,
                    new Response<string>("User doesnot exists", "Error", true));
        }


        [HttpPost("login")]
        public async Task<Response<UserDetail>> Login(LoginInfo info)
        {
            try
            {

                var result = await _signInManager.PasswordSignInAsync(info.Username, info.Password, false, false);
                if (!result.Succeeded)
                {
                    return new Response<UserDetail>(result.ToString(), null, false);
                }
                User user = await _userManager.FindByNameAsync(info.Username);
                UserDetail detail = _mapper.Map<UserDetail>(user);
                detail.AccessToken = GenerateAccessToken(user);
                return new Response<UserDetail>("Login successfull", detail, true);

            }
            catch (Exception ex)
            {
                return new Response<UserDetail>("User not registered", null, false);
            }
        }

        [HttpGet("refresh-login")]
        public async Task<Response<UserDetail>> Login()
        {
            try
            {
                string id = User.FindFirst("PrimarySid").Value.ToString();
                if (id is null)
                {
                    return new Response<UserDetail>("Login credentials invalid", null, false);
                }
                User user = await _userManager.FindByIdAsync(id);
                UserDetail detail = _mapper.Map<UserDetail>(user);
                detail.AccessToken = GenerateAccessToken(user);
                return new Response<UserDetail>("Login successfull", detail, true);

            }
            catch (Exception ex)
            {
                return new Response<UserDetail>("User not registered", null, false);
            }
        }



        private string GenerateAccessToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim("PrimarySid", user.Id),
            new Claim(ClaimTypes.Email, user.Email)
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:issuer"],
                audience: _configuration["JWT:audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(100),
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
    }
}
