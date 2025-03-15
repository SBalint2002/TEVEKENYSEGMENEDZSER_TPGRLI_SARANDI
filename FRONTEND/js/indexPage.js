import ActivityDto from "../models/ActivityDto.js";
import {getColorByType, showToast} from "../utils/uiUtils.js";
import {isInputValid, clearInputFields, populateDropdown, loadSavedActivities, getDays} from "../utils/generalUtils.js";

let activities = [];

document.addEventListener('DOMContentLoaded', async () => {
    await populateDropdown();
    activities = await loadSavedActivities(createTableRow);
    document.getElementById('activity-days').value = getDays() || 1;
    document.getElementById('add-btn').addEventListener('click', addActivity);
    document.getElementById('create-table').addEventListener('click', createTable);
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
    activities.push(activity);

    createTableRow(activity);
    clearInputFields();
}

function createTable() {
    const days = Number(document.getElementById('activity-days').value);

    if (days < 1 || days > 14) {
        showToast('Days must be between 1 and 14', 'bg-danger');
        return;
    }

    if (activities.length === 0) {
        showToast('Add activities first', 'bg-danger');
        return;
    }

    sessionStorage.setItem('days', days);
    sessionStorage.setItem('activities', JSON.stringify(activities));
    window.open('pages/calendarPage.html', '_self')
}

export function createTableRow(activity) {
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
    sessionStorage.setItem('activities', JSON.stringify(activities));
    row.remove();
}