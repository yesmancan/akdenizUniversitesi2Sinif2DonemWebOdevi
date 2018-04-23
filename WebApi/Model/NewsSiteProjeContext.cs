using Microsoft.EntityFrameworkCore;

namespace WebApi.Model
{
    public partial class NewsSiteProjeContext : DbContext
    {
        public static string ConnectionString { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }

        public virtual DbSet<CATEGORY> CATEGORY { get; set; }
        public virtual DbSet<EDITOR> EDITOR { get; set; }
        public virtual DbSet<NEWS> NEWS { get; set; }
        public virtual DbSet<USER> USER { get; set; }
        public virtual DbSet<XUSERS> XUSER { get; set; }
        public virtual DbSet<TAGS> TAG { get; set; }
        public virtual DbSet<SLIDER> SLIDER { get; set; }

    }
}
