using BACKEND.DTOs;
using BACKEND.Models;
using BACKEND.Services;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/schedule")]
    public class ScheduleController : ControllerBase
    {
        private readonly ScheduleService scheduleService;

        public ScheduleController()
        {
            scheduleService = new ScheduleService();
        }

        [HttpPost]
        public IActionResult GenerateSchedule([FromBody] ActivityDto activityDto)
        {
            try
            {
                if (activityDto == null)
                {
                    return BadRequest("Activities can't be null");
                }

                var schedule = scheduleService.GenerateSchedule(activityDto);
                return Ok(schedule);
            }   
            catch (InvalidDataException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
