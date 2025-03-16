import {getColorByType, showToast, showToastWithRedirect} from "../utils/uiUtils.js";
import {ToastType} from "../models/ToastType.js";

document.addEventListener('DOMContentLoaded', async () => {
    const schedule = JSON.parse(sessionStorage.getItem('schedule'))
    if (!schedule) {
        await showToastWithRedirect('No schedule found!', 'bg-danger', '../index.html', ToastType.ALERT);
    }
    generateTable(schedule.day, schedule.activities);
});

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

function generateTable(days, activities) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    uploadHeaderRow(tableHeader, days);
    uploadTimeColumn(tableBody);

    activities.sort((a, b) => (a.day === b.day ? a.startTime - b.startTime : a.day - b.day));

    for (let i = 1; i <= days; i++) {
        for (let hour = 0; hour < 24; hour++) {
            const row = tableBody.rows[hour];
            const activity = activities.find(a => a.day === i && a.startTime === hour);
            const cell = document.createElement('td');
            if (activity) {
                const activityLength = activity.endTime - activity.startTime;
                cell.textContent = activity.name;
                cell.rowSpan = activityLength;
                cell.classList.add('col', getColorByType(activity.type), 'text-light', 'fw-bold');
                hour += activityLength - 1;
            } else {
                cell.classList.add('col');
            }
            row.appendChild(cell);
        }
    }

    showToast('Schedule table successfully generated!', 'bg-success');
}