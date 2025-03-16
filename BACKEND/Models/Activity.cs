namespace BACKEND.Models
{
    public class Activity
    {
        public required string name { get; set; }
        public required int hours { get; set; }
        public required ActivityType type { get; set; }
    }
}