import ActivityType from "../models/ActivityType.js";
import {showToast} from "./uiUtils.js";
import {createTableRow} from "../js/indexPage.js";

export function isInputValid(name, hours, typeValue) {
    if (!name || name === '') {
        showToast('Name cannot be empty', 'bg-danger');
        return false;
    }

    if (hours < 1 || hours > 24) {
        showToast('Hours must be between 1 and 24', 'bg-danger');
        return false;
    }

    if (!Object.values(ActivityType).includes(typeValue)) {
        showToast('Invalid type', 'bg-danger');
        return false;
    }

    return true;
}

export function clearInputFields() {
    document.getElementById('activity-name').value = '';
    document.getElementById('activity-hours').value = '';
    document.getElementById('activity-type').value = ActivityType.OTHER;
}

export function populateDropdown() {
    const select = document.getElementById("activity-type");

    Object.entries(ActivityType).forEach(([_, value]) => {
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        select.appendChild(option);
    });

    select.value = ActivityType.OTHER;
}

export async function loadSavedActivities() {
    const activities = JSON.parse(sessionStorage.getItem('activities')) || [];
    activities.forEach(activity => createTableRow(activity));
    return activities;
}

export function getDays() {
    return Number(sessionStorage.getItem('days'));
}