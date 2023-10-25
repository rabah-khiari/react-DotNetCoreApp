using APIusers.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIusers.Services
{
    public class MovieDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReleasDate { get; set; }
        public string Image { get; set; }
        public int GenreId { get; set; }
        public string Trailer { get; set; }



    }
}
