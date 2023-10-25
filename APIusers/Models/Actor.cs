using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace APIusers.Models
{
    public class Actor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Biography { get; set; }
        public string Picture { get; set; }
        
        [ForeignKey("AppUser")]
        public string UserId { get; set; }
        public ICollection<Movie> Movies { get; set; }


    }
}
