using System;

namespace BACKEND.Models
{
    public class ActivityDto
    {
        public required string Name { get; set; }
        public required int Hours { get; set; }
        public required ActivityType Type { get; set; }
    }
}