import {showToast, showToastWithRedirect} from "../utils/uiUtils.js";
import {createSchedule} from "../services/calendarService.js";
import ActivityDto from "../models/activityDto.js";

document.addEventListener('DOMContentLoaded', async () => {
    const activities = JSON.parse(sessionStorage.getItem('activities')) || [];
    const days = Number(sessionStorage.getItem('days'));

    if (activities.length < 1 || days < 1 || days > 14) {
        showToastWithRedirect('Error in creating table (missing information)', 'bg-danger', '../index.html');
        return;
    }

    const schedule = (await handleCreateSchedule(activities, days)).message;

    generateTable(schedule, days);
    uploadTimeColumn();
});

async function handleCreateSchedule(activities, days) {
    const activityDto = new ActivityDto(activities, days);
    const scheduleResponse = await createSchedule(activityDto);
    if (!scheduleResponse.success) {
        showToastWithRedirect(scheduleResponse.message, 'bg-danger', '../index.html');
    }
    return scheduleResponse;
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

function generateTable(schedule, days) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');
    const rows = tableBody.getElementsByTagName('tr');

    uploadHeaderRow(tableHeader, days);
    uploadTimeColumn(tableBody);

    for (let i = 0; i < days; i++) {
        for (let j = 0; j < rows.length; j++) {
            const cell = document.createElement('td');
            cell.textContent = j;
            cell.classList.add('col');
            rows[j].appendChild(cell);
        }
    }

    showToast('Calendar page loaded', 'bg-success');
}