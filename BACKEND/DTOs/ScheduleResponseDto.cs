using BACKEND.Models;
using System;

namespace BACKEND.DTOs
{
    public class ScheduleResponseDto
    {
        public required string Day { get; set; }
        public required List<ActivityDto> Activities { get; set; }
    }
}