import Activity from "../models/Activity.js";
import {getColorByType, showToast} from "../utils/uiUtils.js";
import {isInputValid, clearInputFields, populateDropdown, loadSavedActivities, getDays} from "../utils/generalUtils.js";
import ActivityDto from "../models/dto/ActivityDto.js";
import {createSchedule} from "../services/calendarService.js";
import ScheduleResponseDto from "../models/dto/ScheduleResponseDto.js";
import {ToastType} from "../models/ToastType.js";

let activities = [];

document.addEventListener('DOMContentLoaded', async () => {
    await populateDropdown();
    activities = await loadSavedActivities(createTableRow);
    document.getElementById('activity-days').value = getDays() || 1;
    document.getElementById('add-btn').addEventListener('click', addActivity);
    document.getElementById('create-table').addEventListener('click', await createTable);
});

function addActivity() {
    const name = document.getElementById('activity-name').value;
    const hours = Number(document.getElementById('activity-hours').value);
    const typeValue = document.getElementById('activity-type').value;

    if (!isInputValid(name, hours, typeValue)) return;

    const activity = new Activity(name, hours, typeValue);
    activities.push(activity);

    createTableRow(activity);
    clearInputFields();
}

async function createTable() {
    const days = Number(document.getElementById('activity-days').value);

    if (days < 1 || days > 14) {
        showToast('Days must be between 1 and 14!', 'bg-danger', ToastType.ALERT);
        return;
    }

    if (activities.length === 0) {
        showToast('Add activities first!', 'bg-danger', ToastType.ALERT);
        return;
    }

    await handleCreateSchedule(activities, days);
}

export function createTableRow(activity) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${activity.name}</td>
        <td>${activity.hours}</td>
        <td><span class="badge ${getColorByType(activity.type)}">${activity.type}</span></td>
        <td><button class="btn-close"></button></td>
    `;
    row.querySelector('.btn-close').addEventListener('click', () => deleteActivity(activity, row));
    document.getElementById('activity-rows').appendChild(row);
}

function deleteActivity(activity, row) {
    activities = activities.filter(a => a !== activity);
    sessionStorage.setItem('activities', JSON.stringify(activities));
    row.remove();
}

async function handleCreateSchedule(activities, days) {
    const activityDto = new ActivityDto(activities, days);
    const scheduleResponse  = await createSchedule(activityDto);
    if (!scheduleResponse.success) {
        showToast(scheduleResponse.message, 'bg-danger', ToastType.ALERT);
    } else {
        const schedule = scheduleResponse.message
        sessionStorage.setItem('schedule', JSON.stringify(new ScheduleResponseDto(schedule.day, schedule.activities)));
        window.open('pages/calendarPage.html', '_self');
    }
}