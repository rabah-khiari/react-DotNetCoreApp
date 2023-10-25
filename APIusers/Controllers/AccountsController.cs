using APIusers.Models;
using APIusers.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APIusers.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        public readonly UserManager<AppUsers> userManager;
        public readonly SignInManager<AppUsers> signInManager;
        public readonly IConfiguration configuration;
        public AccountsController(UserManager<AppUsers> userManger 
            ,SignInManager<AppUsers> signInMangr ,
            IConfiguration config)
        {
            userManager = userManger;
            signInManager = signInMangr;
            configuration = config;
        }
        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Create(
            UserCredentials userCred)
        {
            Console.WriteLine("\n\n\n *************" + userCred.Email + "************ \n\n\n");
            var user = new AppUsers 
                { UserName = userCred.Email,
                Email = userCred.Email
                ,User="true",Admin="true",Super="false"}; 
            var result = await userManager.CreateAsync(user,userCred.Password);
            if (result.Succeeded)
            {
                return await BuildToken(userCred);
            }
            else BadRequest(" incorrect regester mail or password");
            return BadRequest();
            
        }
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(
            UserCredentials userCred)
        {
            
            var result = await signInManager.PasswordSignInAsync(userCred.Email,
                userCred.Password,isPersistent:false,lockoutOnFailure:false);
            if (result.Succeeded)
            {
                return await BuildToken(userCred);
            }
            else BadRequest("incorrect login");

            return BadRequest();

        }
        private async Task<AuthenticationResponse> BuildToken(UserCredentials userCred)
        {
            var user = await userManager.FindByEmailAsync(userCred.Email);
           var a =  user.Id;
            
            var claims = new List<Claim>()
            {
                
                new Claim("mail",userCred.Email),
                new Claim("user",user.User),
                new Claim("admin",user.Admin),
                new Claim("super",user.Super)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
            var creds =  new SigningCredentials(key,SecurityAlgorithms.HmacSha256); 
            var expiration = DateTime.UtcNow.AddDays(1);
            var token= new JwtSecurityToken(issuer: null ,audience: null ,claims: claims,
                 expires: expiration ,signingCredentials:creds );
            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }

    }
}
