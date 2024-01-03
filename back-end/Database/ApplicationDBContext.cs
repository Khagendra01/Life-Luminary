using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using back_end.Classes;
using System.Security.Cryptography.X509Certificates;

namespace back_end.Database
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            
        }

        public DbSet<Post> Post { get; set; }
        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<UserReact> UserReact { get; set; }
        public DbSet<Story> Stories { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>()
                .HasMany(user => user.Posts)
                .WithOne(post => post.User)
                .HasForeignKey(user => user.UserID);

        }
    }
}
