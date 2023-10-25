using Microsoft.AspNetCore.Identity;

namespace APIusers.Models
{
    public class AppUsers : IdentityUser
    {
        public string Admin { get; set; } = "false";
        public string Super { get; set; } = "false";
        public string User { get; set; } = "false";

    }
}
