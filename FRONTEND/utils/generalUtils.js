import ActivityType from "../models/ActivityType.js";
import {showToast} from "./uiUtils.js";
import {createTableRow} from "../js/indexPage.js";
import {ToastType} from "../models/ToastType.js";

export function isInputValid() {
    const name = document.getElementById('activity-name');
    const hours = document.getElementById('activity-hours');
    const type = document.getElementById('activity-type');

    resetBorders(name, hours, type);

    let toastType = ToastType.ALERT;
    let toastMsg = null;
    let valid = true;

    if (!validateName(name)) {
        toastMsg = 'Name must be between 1 and 20 characters!';
        valid = false;
    }

    const hoursValidation = validateHours(hours.value);
    if (hoursValidation.error) {
        toastMsg = toastMsg || hoursValidation.message;
        toastType = hoursValidation.type || toastType;
        hours.style.border = '1px solid red';
        valid = false;
    }

    if (!validateType(type)) {
        toastMsg = toastMsg || 'Invalid type!';
        valid = false;
    }

    if (!valid) {
        showToast(toastMsg, 'bg-danger', toastType);
    }

    return valid;
}

function resetBorders(...elements) {
    elements.forEach(el => el.style.border = '1px solid #ced4da');
}

function validateName(name) {
    if (!name.value.trim()) {
        name.style.border = '1px solid red';
        return false;
    }
    if (name.value.length > 20) {
        name.style.border = '1px solid red';
        return false;
    }
    return true;
}

function validateHours(hoursValue) {
    const hoursRegex = /^[1-9]$|^1[0-6]$/;
    if (!Number.isInteger(Number(hoursValue))) {
        return { error: true, message: 'Invalid number' };
    }
    if (!Number(hoursValue)) {
        return { error: true, message: 'Hours cannot be empty' };
    }
    if (hoursValue > 16) {
        return { error: true, message: 'Broo... You need to rest sometimes!', type: ToastType.CRAZY };
    }
    if (!hoursRegex.test(hoursValue)) {
        return { error: true, message: 'Hours must be between 1 and 16' };
    }
    return { error: false };
}

function validateType(type) {
    if (!Object.values(ActivityType).includes(type.value)) {
        type.style.border = '1px solid red';
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