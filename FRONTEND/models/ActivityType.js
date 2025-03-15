const ActivityType = Object.freeze({
    WORK: "Work",
    STUDY: "Study",
    EXERCISE: "Exercise",
    HOBBY: "Hobby",
    SOCIAL: "Social",
    RELAX: "Relax",
    EAT: "Eat",
    SLEEP: "Sleep",
    OTHER: "Other"
})

export default ActivityType;

export function isValidActivityType(type) {
    return Object.values(ActivityType).includes(type);
}