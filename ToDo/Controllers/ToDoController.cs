using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Contexts;
using ToDo.Entities;
using ToDo.Repositories;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {

        private readonly AppDbContext _appDbContext;
        private readonly ILogger<ToDoController> _logger;

        public ToDoController(ILogger<ToDoController> logger, AppDbContext appDbContext)
        {
            _logger = logger;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_appDbContext.Duties.ToList());

            }
            catch (Exception ex)
            {
                return BadRequest($"error:{ex}");
            }
            
        }

        [HttpGet("{id}", Name = "GetDuty")]
        public ActionResult Get(int id)
        {
            try
            {
                var result = _appDbContext.Duties.FirstOrDefault(x => x.Id == id);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
            
        }

        [HttpPost]
        public ActionResult Post([FromBody] Duty duty)
        {
            try
            {
                _appDbContext.Duties.Add(duty);
                _appDbContext.SaveChanges();
                return CreatedAtRoute("GetDuty", new { id = duty.Id }, duty);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] Duty duty)
        {
            try
            {
                _appDbContext.Duties.Attach(duty);
                _appDbContext.Entry(duty).State = EntityState.Modified;
                _appDbContext.SaveChanges();
                return CreatedAtRoute("GetDuty", new { id = duty.Id }, duty);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var duty = _appDbContext.Duties.FirstOrDefault(x => x.Id == id);
                if (duty != null)
                {
                    _appDbContext.Remove(duty);
                    _appDbContext.SaveChanges();
                    return Ok(id);

                }
                return BadRequest();
                

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
