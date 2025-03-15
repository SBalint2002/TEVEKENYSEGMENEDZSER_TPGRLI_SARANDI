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
        public IActionResult GenerateSchedule([FromBody] List<ActivityDto> activities)
        {
            var schedule = scheduleService.GenerateSchedule(activities);
            return Ok(schedule);
        }
    }
}
