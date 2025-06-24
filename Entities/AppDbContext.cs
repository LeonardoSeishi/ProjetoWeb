using Microsoft.EntityFrameworkCore;
using ProjetoWeb.Entities;

namespace ProjetoWeb.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
    }
}
