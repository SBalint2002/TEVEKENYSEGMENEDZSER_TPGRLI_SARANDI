using BACKEND.DTOs;
using BACKEND.Models;
using System;

namespace BACKEND.Services
{
    public class ScheduleService
    {
        public ScheduleResponseDto GenerateSchedule(ActivityDto activityDto)
        {
            int days = activityDto.days;
            List<Activity> activities = activityDto.activities;

            activities = activities.OrderByDescending(a => a.hours).ToList();

            int maxDailHours = 16;
            int restTime = 1;

            List<List<ScheduledActivity>> schedule = new List<List<ScheduledActivity>>();
            for (int i = 0; i < days; i++)
            {
                schedule.Add(new List<ScheduledActivity>());
            }

            int[] dailyHours = new int[days];

            foreach (var activity in activities)
            {
                int bestDay = Array.IndexOf(dailyHours, dailyHours.Min());

                int startTime = dailyHours[bestDay] + 8;
                int endTime = startTime + activity.hours;

                schedule[bestDay].Add(new ScheduledActivity(activity.name, activity.type, bestDay + 1, startTime, endTime));

                dailyHours[bestDay] += activity.hours + 1;
            }

            return new ScheduleResponseDto
            {
                day = days,
                activities = schedule.SelectMany(day => day).ToList()
            };
        }
    }
}
