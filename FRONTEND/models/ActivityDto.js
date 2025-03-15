import {isValidActivityType} from "./ActivityType.js";

class ActivityDto {
    constructor(name, days, hours, type) {

        if (!isValidActivityType(type)) {
            throw new Error('Invalid activity type');
        }

        this.name = name;
        this.days = days;
        this.hours = hours;
        this.type = type;
    }
}

export default ActivityDto;