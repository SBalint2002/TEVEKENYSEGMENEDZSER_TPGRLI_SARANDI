namespace BACKEND.Models
{
    public class ScheduledActivity
    {
        public string name { get; set; }
        public ActivityType type { get; set; }
        public int day { get; set; }
        public int startTime { get; set; }
        public int endTime { get; set; }

        public ScheduledActivity(string name, ActivityType type, int day, int startTime, int endTime)
        {
            this.name = name;
            this.type = type;
            this.day = day;
            this.startTime = startTime;
            this.endTime = endTime;
        }
    }
}