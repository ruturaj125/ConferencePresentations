using Microsoft.EntityFrameworkCore;

namespace CodingExercise.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
        public DbSet<Users> users { get; set; }
        public DbSet<Presentations> presentations { get; set; }
    }
}
