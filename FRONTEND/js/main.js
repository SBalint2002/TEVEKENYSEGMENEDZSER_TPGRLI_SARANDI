import ActivityDto from "../models/ActivityDto.js";
import ActivityType from "../models/ActivityType.js";
import {getColorByType} from "./ui.js";

let activities = [];

document.addEventListener('DOMContentLoaded', async () => {
    await populateDropdown();
    document.getElementById('add-btn').addEventListener('click', addActivity);
});

function addActivity() {
    const name = document.getElementById('activity-name').value;
    const hours = Number(document.getElementById('activity-hours').value);
    const typeSelect = document.getElementById('activity-type');
    const typeValue = typeSelect.options[typeSelect.selectedIndex].value;

    if (!isInputValid(name, hours, typeValue)) {
        return;
    }

    const activity = new ActivityDto(name, hours, typeValue);

    createTableRow(activity);
    clearInputFields();
}

function isInputValid(name, hours, typeValue) {
    const errorField = document.getElementById('error-message');

    if (!name || name === '') {
        errorField.innerText = 'Name cannot be empty';
        return false;
    }

    if (hours < 1 || hours > 24) {
        errorField.innerText = 'Hours must be between 1 and 24';
        return false;
    }

    if (!Object.values(ActivityType).includes(typeValue)) {
        errorField.innerText = 'Invalid type';
        return false;
    }

    errorField.innerText = '';
    return true;
}

function createTableRow(activity) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const hoursCell = document.createElement('td');
    const typeCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const typeBadge = document.createElement('span');
    const deleteButton = document.createElement('button');

    nameCell.textContent = activity.name;
    hoursCell.textContent = activity.hours;
    typeBadge.textContent = activity.type;
    let color = getColorByType(activity.type);
    typeBadge.classList.add('badge', color);
    typeCell.appendChild(typeBadge);

    deleteButton.classList.add('btn-close');
    deleteButton.addEventListener('click', () => deleteActivity(activity, row));
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(hoursCell);
    row.appendChild(typeCell);
    row.appendChild(actionCell);

    document.getElementById('activity-rows').appendChild(row);
}

function deleteActivity(activity, row) {
    activities = activities.filter(a => a !== activity);
    row.remove();
}

function clearInputFields() {
    document.getElementById('activity-name').value = '';
    document.getElementById('activity-hours').value = '';
    document.getElementById('activity-type').value = ActivityType.OTHER;
}

function populateDropdown() {
    const select = document.getElementById("activity-type");

    Object.entries(ActivityType).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        select.appendChild(option);
    });

    select.value = ActivityType.OTHER;
}

export {addActivity, populateDropdown};