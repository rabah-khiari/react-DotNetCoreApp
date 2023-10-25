using APIusers.Models;
using APIusers.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Xml.Linq;

namespace APIusers.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class GenreController : ControllerBase
    {
        
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUsers> userManager;
        public GenreController(ApplicationDbContext context
            , UserManager<AppUsers> userManagr)
        {
            _context = context;
            userManager = userManagr;
            Console.WriteLine("\n\n\n ************* controle ************ \n\n\n");

        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Policy ="User")]
        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll(int page)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x=>x.Type== "mail").Value;
            var User = await userManager.FindByEmailAsync(email);
            var userId=User.Id;
            Console.WriteLine("\n\n\n ********** get page "+ page + userId + " get *************** \n\n\n");
            Console.WriteLine(  userId );

            
            if(page == 0) { return Ok(await _context.Genres.ToListAsync());}else
            {   
                page = page - 1;
                return Ok( await _context.Genres.Skip(page*7).Take(7).ToListAsync());
            }
            
        }
        
        [HttpGet]
        [Route("GetNumbPage")]
        public async Task<IActionResult> GetNumbPage()
        {
            //var email = HttpContext.User.Claims.FirstOrDefault(x=>x.Type== "email").Value;
            //var User = await userManager.FindByEmailAsync(email);
            //var userId=User.Id;
            Console.WriteLine("\n\n\n ********** Get Nb page  *************** \n\n\n");
            return Ok((await _context.Genres.CountAsync()+6)/7);
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Policy = "Admin")]
        [HttpPost]
        public async Task<IActionResult> PostGenre(Genre genre)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            Console.WriteLine("\n\n\n ************* post ************ \n\n\n");
            await _context.Genres.AddAsync(genre);
            await _context.SaveChangesAsync();
            return Ok("Creating success");
        }

        //[HttpGet("{id:int}/{param2=rien}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Policy = "Admin")]
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            Console.WriteLine("\n\n\n ************ "+id+"************* \n\n\n");
            return Ok(_context.Genres.FirstOrDefault(x => x.Id == id));
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Policy = "Admin")]
        [HttpPatch]
        public IActionResult Update(int id, Genre Gen)
        {
            Console.WriteLine("\n\n\n ************ patch " + id +Gen.Name+ "************* \n\n\n");
            if(id == Gen.Id)
            {
                _context.Genres.Update(Gen);
                _context.SaveChanges();
                return Ok("Update success");
            }
            else { return BadRequest(); }
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Policy = "Admin")]
        [HttpDelete]
        public IActionResult DeleteGen(int id)
        {

            Console.WriteLine("\n\n\n ************ delete " + id +  "************* \n\n\n");

            _context.Genres.Remove(_context.Genres.Find(id));
            _context.SaveChanges();
            return Ok("Delete success"); 
        }

    }
}
