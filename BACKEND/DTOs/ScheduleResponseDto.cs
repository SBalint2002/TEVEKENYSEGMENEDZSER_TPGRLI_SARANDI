using BACKEND.Models;
using System;

namespace BACKEND.DTOs
{
    public class ScheduleResponseDto
    {
        public required int day { get; set; }
        public required List<Activity> activities { get; set; }
    }
}