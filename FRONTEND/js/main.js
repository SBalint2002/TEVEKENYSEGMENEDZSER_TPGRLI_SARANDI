import ActivityDto from "../models/ActivityDto.js";
import ActivityType from "../models/ActivityType.js";

let activities = [];

document.addEventListener('DOMContentLoaded', async () => {
    await populateDropdown();
    document.getElementById('add-btn').addEventListener('click', addActivity);
});

function addActivity() {
    const name = document.getElementById('activity-name').value;
    const days = Number(document.getElementById('activity-days').value);
    const hours = Number(document.getElementById('activity-hours').value);
    const typeSelect = document.getElementById('activity-type');
    const typeValue = typeSelect.options[typeSelect.selectedIndex].value;

    if (!isInputValid(name, days, hours, typeValue)) {
        return;
    }

    const activity = new ActivityDto(name, days, hours, typeValue);
    activities.push(activity);

    createTableRow(activity);
    clearInputFields();
}

function isInputValid(name, days, hours, typeValue) {
    const errorField = document.getElementById('error-message');

    if (!name || name === '') {
        errorField.innerText = 'Name cannot be empty';
        return false;
    }

    if (days < 1 || days > 7) {
        errorField.innerText = 'Days must be between 1 and 7';
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
    nameCell.textContent = activity.name;
    row.appendChild(nameCell);

    const daysCell = document.createElement('td');
    daysCell.textContent = activity.days;
    row.appendChild(daysCell);

    const hoursCell = document.createElement('td');
    hoursCell.textContent = activity.hours;
    row.appendChild(hoursCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = activity.type;
    row.appendChild(typeCell);

    document.getElementById('activity-rows').appendChild(row);
}

function clearInputFields() {
    document.getElementById('activity-name').value = '';
    document.getElementById('activity-days').value = '';
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