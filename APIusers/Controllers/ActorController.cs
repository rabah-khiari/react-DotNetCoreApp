using APIusers.Models;
using APIusers.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;


namespace APIusers.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUsers> userManager;
        public ActorController(ApplicationDbContext context,
            UserManager<AppUsers> userManager)
        {
            _context = context;
            Console.WriteLine("\n\n\n ************* controle Actor ************ \n\n\n");
            this.userManager = userManager;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll(int page)
        {
            Console.WriteLine("\n\n\n ********** simple " + page + " get *************** \n\n\n");
            page = page - 1;
            return Ok(await _context.Actors.Skip(page * 3).Take(3).ToListAsync());
        }
       

        [HttpGet]
        [Route("GetAllMovies")]
        public async Task<IActionResult> GetAllMovies(int idActor)
        {
            Console.WriteLine("\n\n\n ********** all movies " + idActor + " get *************** \n\n\n");
            var result=  (from Mv in _context.Movies
                         join ActMv in _context.ActorMovies on Mv.Id equals ActMv.MovieId 
                         where ActMv.ActorId == idActor
                         select new
                         {
                             Title = Mv.Title,
                             Description = Mv.Description
                             
                         }).Take(10);
            return Ok( result.ToList());
        }
        [HttpGet]
        [Route("GetNumbPage")]
        public async Task<IActionResult> GetNumbPage()
        {
            //var email = HttpContext.User.Claims.FirstOrDefault(x=>x.Type== "email").Value;
            //var User = await userManager.FindByEmailAsync(email);
            //var userId=User.Id;
            Console.WriteLine("\n\n\n ********** Get Nb page  *************** \n\n\n");
            return Ok((await _context.Actors.CountAsync() + 2) / 3);
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Policy = "Admin")]
        [HttpPost]
        public async Task<IActionResult> PostActor(ActorDTO actor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "mail").Value;
            var User = await userManager.FindByEmailAsync(email);
             
            Actor actorTemp= new Actor();
            actorTemp.Name = actor.Name;
            actorTemp.Biography = actor.Biography;
            actorTemp.DateOfBirth = actor.DateOfBirth;
            actorTemp.Picture = actor.Picture;
            actorTemp.UserId = User.Id;

            Console.WriteLine("\n\n\n ************* post ************ \n\n\n");
            await _context.Actors.AddAsync(actorTemp);
            await _context.SaveChangesAsync();
            return Ok("Creating success");
        }
       

        [HttpPost]
        [Route("UploadFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationtoken)
        {
            Console.WriteLine("\n\n new image uploaded  \n\n");
            var result = await WriteFile(file);
            return Ok(result);
        }

        private async Task<string> WriteFile(IFormFile file)
        {

            string filename = "";
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                filename = DateTime.Now.Ticks.ToString() + extension;

                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);
                using (var stream = new FileStream(exactpath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
            }
            return filename;
        }
        [HttpGet]
        [Route("DownloadFile")]
        public async Task<IActionResult> DownloadFile(string filename)
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filepath, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
            return File(bytes, contenttype, Path.GetFileName(filepath));
        }
    }
}
