using AutoMapper;
using back_end.Classes;
using back_end.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Azure.Core;
using System.Net.Http.Headers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public GoogleController(UserManager<User> userManager,
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
        public async Task<Response<UserDetail>> Login(GoogleUserInfo idToken)
        {
            try
            {

                var goodUser = await _userManager.FindByEmailAsync(idToken.Email);
                if (goodUser != null)
                {
                    UserDetail checking = _mapper.Map<UserDetail>(goodUser);
                    checking.AccessToken = GenerateAccessToken(goodUser);
                    return new Response<UserDetail>("Login successfull", checking, true);
                }

                RegisterInfo newInfo = new RegisterInfo();

                newInfo.Email = idToken.Email;
                newInfo.FirstName = idToken.Given_Name;
                newInfo.LastName = idToken.Family_Name;
                newInfo.UserName = idToken.Given_Name + Guid.NewGuid().ToString();
                newInfo.Password = GeneratePassword(15);
                newInfo.ConfirmPassword = newInfo.Password;

                User user = _mapper.Map<User>(newInfo);

                var result = await _userManager.CreateAsync(user, newInfo.Password);


                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    await _userManager.ConfirmEmailAsync(user, code);

                    var newUser = await _userManager.FindByEmailAsync(user.Email);
                    if (newUser != null)
                    {
                        UserDetail checkingTwo = _mapper.Map<UserDetail>(newUser);
                        checkingTwo.AccessToken = GenerateAccessToken(newUser);
                        return new Response<UserDetail>("Login successfull", checkingTwo, true);
                    }

                }
                return new Response<UserDetail>(result.ToString(), null, false);

            }
            catch (Exception ex)
            {
                return new Response<UserDetail>(ex.Message, null, false);
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

        private string GeneratePassword(int length)
        {
            string uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
            string numbers = "0123456789";
            string symbols = "!@#$%^&*()-_+=<>?";

            // Ensure the length is at least 12 characters
            if (length < 12) length = 12;

            string allChars = uppercaseChars + lowercaseChars + numbers + symbols;

            Random random = new Random();

            // Ensure at least one character from each set is included
            string password = new string(
                uppercaseChars[random.Next(uppercaseChars.Length)] +
                lowercaseChars[random.Next(lowercaseChars.Length)] +
                symbols[random.Next(symbols.Length)] +
                new string(Enumerable.Repeat(allChars, length - 3)
                    .Select(s => s[random.Next(s.Length)])
                    .ToArray())
            );

            // Shuffle the generated password characters
            password = new string(password.ToCharArray().OrderBy(c => random.Next()).ToArray());

            return password;
        }
    }
}
