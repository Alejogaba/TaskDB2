using Microsoft.EntityFrameworkCore;
namespace Angular.Models
{
    public class TaskContext:DbContext
    {
          public TaskContext(DbContextOptions<TaskContext> options):base(options){}
    public DbSet<TaskItems> TaskItems {get;set;}   
    }
}