using System.ComponentModel.DataAnnotations.Schema;

namespace APIusers.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ReleasDate { get; set; }
        public string Image { get; set; } 
        public float Rating { get; set; }
        public float RateNbr { get; set; }
        public string Trailer { get; set; }
        [ForeignKey("Genre")]
        public int GenreId { get; set; }
        public Genre Genre { get; set; }

        [ForeignKey("AppUser")]
        public string UserId { get; set; }
        public ICollection<Actor> Actors { get; set; }


    }
}
