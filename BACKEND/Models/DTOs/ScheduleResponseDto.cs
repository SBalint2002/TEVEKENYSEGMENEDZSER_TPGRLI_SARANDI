using BACKEND.Models;
using System;

namespace BACKEND.Models.DTOs
{
    public class ScheduleResponseDto
    {
        public required int day { get; set; }
        public required List<ScheduledActivity> activities { get; set; }

        public ScheduleResponseDto()
        {

        }
    }
}