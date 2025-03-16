using BACKEND.DTOs;
using BACKEND.Models;
using System;

namespace BACKEND.Services
{
    public class ScheduleService
    {
        public ScheduleResponseDto GenerateSchedule(ActivityDto activityDto)
        {

            //TODO: algoritmus

            return new ScheduleResponseDto { activities = [new Activity { name = "example", hours = 1, type = ActivityType.Other }], day = 1 };
        }
    }
}
