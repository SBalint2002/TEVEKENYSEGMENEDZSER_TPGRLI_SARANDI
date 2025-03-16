import {showToast, showToastWithRedirect} from "../utils/uiUtils.js";
import {createSchedule} from "../services/calendarService.js";
import ActivityDto from "../models/dto/ActivityDto.js";
import ScheduleResponseDto from "../models/dto/ScheduleResponseDto.js";

document.addEventListener('DOMContentLoaded', async () => {
    const activities = JSON.parse(sessionStorage.getItem('activities')) || [];
    const days = Number(sessionStorage.getItem('days'));

    if (activities.length < 1 || days < 1 || days > 14) {
        showToastWithRedirect('Error in creating table (missing information)', 'bg-danger', '../index.html');
        return;
    }

    const schedule = await handleCreateSchedule(activities, days);
    generateTable(schedule.activities, schedule.day);
});

async function handleCreateSchedule(activities, days) {
    const activityDto = new ActivityDto(activities, days);
    const scheduleResponse = await createSchedule(activityDto);
    if (!scheduleResponse.success) {
        showToastWithRedirect(scheduleResponse.message, 'bg-danger', '../index.html');
    }
    const schedule = scheduleResponse.message;
    return new ScheduleResponseDto(schedule.day, schedule.activities);
}

function uploadTimeColumn(tableBody) {

    for (let hour = 0; hour < 24; hour++) {
        let row = document.createElement('tr');

        let timeCell = document.createElement('td');
        timeCell.textContent = `${hour}:00`;
        timeCell.classList.add('time-column', 'text-center', 'fw-bold');
        timeCell.style.width = '50px';
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    }
}

function uploadHeaderRow(tableHeader, days) {
    const th = document.createElement('th');
    tableHeader.appendChild(th);
    for (let i = 0; i < days; i ++) {
        const th = document.createElement('th');
        th.textContent = `Day ${i + 1}`;
        tableHeader.appendChild(th);
    }
}

function generateTable(activities, days) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    uploadHeaderRow(tableHeader, days);
    uploadTimeColumn(tableBody);

    activities.sort((a, b) => (a.day === b.day ? a.startTime - b.startTime : a.day - b.day));
    console.log(activities);

    for (let i = 1; i <= days; i++) {
        for (let hour = 0; hour < 24; hour++) {
            const row = tableBody.rows[hour];

            const activity = activities.find(a => a.day === i && a.startTime === hour);
            if (activity) {
                const cell = document.createElement('td');
                const activityLength = activity.endTime - activity.startTime;
                cell.textContent = activity.name;
                cell.rowSpan = activityLength;
                cell.classList.add('col');
                row.appendChild(cell);
                hour += activityLength - 1;
            } else {
                const cell = document.createElement('td');
                cell.classList.add('col');
                row.appendChild(cell);
            }
        }
    }

    showToast('Calendar page loaded', 'bg-success');
}