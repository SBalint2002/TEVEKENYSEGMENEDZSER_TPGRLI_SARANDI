using BACKEND.Models;
using System;

namespace BACKEND.DTOs
{
    public class ActivityDto
    {
        public required List<Activity> activities { get; set; }
        public required int days { get; set; }

        public ActivityDto(List<Activity> activities, int days)
        {
            this.activities = activities;
            this.days = days;
        }
    }
}