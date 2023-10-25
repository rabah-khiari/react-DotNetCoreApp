using APIusers.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace APIusers.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing XW", "Bracing XW", "Chilly", "Cool XW", "Mild XW", "Warm XW", "BalmyXW", "Hot XW", "Sweltering XW", "Scorching XW"
    };
         
        private readonly ILogger<WeatherForecastController> _logger;
    

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
  
            _logger = logger;
        }

        [HttpGet]
        [Route("Getdweather")]
        public IEnumerable<WeatherForecast> Get()
        {
            
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(50, 60),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
        [HttpGet]
        [Route("GetdropWathss")]
        public IEnumerable<WeatherForecast> Drop()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-40, -30),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
        [HttpPost]
        [Route("PostProd")]
        public void PostProd(product x)
        {

           Console.WriteLine("\n\n postProd"+x.Name+x.prix+"\n\n");
        }
        [HttpDelete]
        [Route("DeleteProd")]
        public void DeleteProd(int x)
        {
           Console.WriteLine("\n\n delete number : " + x +"  fait \n\n");
        }
        [HttpPatch]
        [Route("UpdateProd")]
        public void UpdateProd(int id,product y)
        {
            Console.WriteLine("\n\n id : "+id+" prod := "+y.Name+y.prix+"\n\n");
        }
        [HttpPost]
        [Route("UploadImage")]
        public void UploadImage(IFormFile y)
        {
            Console.WriteLine("\n\n image uploaded  \n\n");

        }
        //***************************************************

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
        //*****************************************************
    }
}