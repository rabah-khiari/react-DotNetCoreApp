using APIusers.Models;

namespace APIusers.Services
{
    public class InMemoryRepository
    {
        public List<Genre> Genres;
        public  InMemoryRepository() {
            Genres = new List<Genre>()
            {
                new Genre() {Id=1,Name="Comedy" },
                new Genre() {Id=2,Name="Action" },
                new Genre() {Id=3,Name="Drama" }
            };
        }
        public List<Genre> GetGenres()
        {
            return Genres;
        }
    }
}
