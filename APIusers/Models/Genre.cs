using System.ComponentModel.DataAnnotations;

namespace APIusers.Models
{
    public class Genre
    {
        public int Id { get; set; }
        [Required (ErrorMessage ="Name sholdn't be emtpy ")]
        [StringLength(10) ]
        public string Name { get; set; }
    }
}
