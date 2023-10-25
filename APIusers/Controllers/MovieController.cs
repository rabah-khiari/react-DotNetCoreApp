using APIusers.Models;
using APIusers.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;

namespace APIusers.Controllers
{
[Route("[controller]")]
[ApiController]
    
public class MovieController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<AppUsers> userManager;
    public MovieController(ApplicationDbContext context,
        UserManager<AppUsers> userManager)
    {
        _context = context;
        Console.WriteLine("\n\n\n ************* controle Movie ************ \n\n\n");
        this.userManager = userManager;
    }
    [HttpGet]
    [Route("GetAll")]
    public async Task<IActionResult> GetAllMovie(int page)
    {
        Console.WriteLine("\n\n\n ********** get 8 movie  *************** \n\n\n");
        page = page - 1;
        return Ok(await _context.Movies.Include(a=>a.Genre).Skip(page * 8).Take(8).ToListAsync());
    }
    [HttpGet]
    [Route("GetAllActor")]
    public async Task<IActionResult> GetAllActor(int idMovie)
    {
        Console.WriteLine("\n\n\n ********** all movies " + idMovie + " get *************** \n\n\n");
        var result = (from Act in _context.Actors
                        join ActMv in _context.ActorMovies on Act.Id equals ActMv.ActorId
                        where ActMv.MovieId == idMovie
                        select new
                        {
                            Title = Act.Name,
                            Description = Act.Biography

                        }).Take(10);
        return Ok(result.ToList());
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Policy = "User")]
    [HttpGet]
    [Route("IsRated")]
    public async Task<IActionResult> isRated()
    {
        Console.WriteLine("\n\n\n ********** Is rated *************** \n\n\n");
        var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "mail").Value;
        var User = await userManager.FindByEmailAsync(email);
        var exist = _context.Ratings.Where(x => x.UserId == User.Id).Select(i=>i.MovieId);

        return Ok(exist.ToList());
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
     Policy = "User")]
    [HttpGet]
    [Route("RateMovie")]
    public async Task<IActionResult> RateMovie(int idMovie,int rating)
    {
        Console.WriteLine("\n\n\n ********** rate movies " + idMovie + " get *************** \n\n\n");
        var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "mail").Value;
        var User = await userManager.FindByEmailAsync(email);
        var exist = _context.Ratings.Where(x => x.UserId == User.Id).Where(c => c.MovieId == idMovie);
        
        if (exist.IsNullOrEmpty())
        {   
            var Mov = await _context.Movies.FirstAsync(a => a.Id == idMovie);
            Mov.Rating = (Mov.Rating*Mov.RateNbr + rating)/ (Mov.RateNbr + 1);
            Mov.RateNbr++;

            Rating rating1 = new Rating{ MovieId= idMovie ,UserId=User.Id,Rate= rating};
            _context.Ratings.Add(rating1);

            _context.SaveChanges();
            return Ok(true);
        }else
        {
            
            return Ok(false);
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
        return Ok((await _context.Movies.CountAsync() + 7) / 8);
    }
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Policy = "Admin")]
    [HttpPost]
    public async Task<IActionResult> PostMovie(MovieDTO Movie)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "mail").Value;
        var User = await userManager.FindByEmailAsync(email);

        Movie MovieTemp = new Movie();
        MovieTemp.Title = Movie.Title;
        MovieTemp.Description = Movie.Description;
        MovieTemp.ReleasDate = Movie.ReleasDate;
        MovieTemp.CreatedDate= DateTime.Now;
        MovieTemp.UserId = User.Id;
        MovieTemp.GenreId = Movie.GenreId;
        MovieTemp.Image=Movie.Image;
        MovieTemp.Rating = 0;
        MovieTemp.RateNbr = 0;
        MovieTemp.Trailer = Movie.Trailer;


        Console.WriteLine("\n\n\n ************* post Movie ************ \n\n\n");
        await _context.Movies.AddAsync(MovieTemp);
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
