using System;

namespace BACKEND.Models
{
    public class ActivityDto
    {
        public required Activity[] activities { get; set; }
        public required int days { get; set; }
    }
}