using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Angular.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController:Controller
    {
        
        private readonly TaskContext _context;
        public TaskController(TaskContext context)
        {
            _context=context;
        }
        //Get: api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItems>>> GetTask()
        {
            return await _context.TaskItems.ToListAsync();
        }
        //Get: api/Task/id
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItems>> GetTask(int id)
        {
            var taskitem = await _context.TaskItems.FindAsync(id);
            if (taskitem==null)
            {
                return NotFound();
            }
            return taskitem;
        }
        //Post: api/Task
        [HttpPost]
        public async Task<ActionResult<TaskItems>> PostTask(TaskItems taskitem)
        {
            _context.TaskItems.Add(taskitem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = taskitem.Id }, taskitem);
        }

        //Put: api/Task/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id,TaskItems item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Delete: api/Task/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var Item = await _context.TaskItems.FindAsync(id);
            if (Item==null)
            {
                return NotFound();
            }
            _context.TaskItems.Remove(Item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
    }
}