import {showToast} from "../utils/uiUtils.js";
import {createSchedule} from "../services/calendarService.js";
import ActivityDto from "../models/activityDto.js";

document.addEventListener('DOMContentLoaded', async () => {
    const activities = JSON.parse(sessionStorage.getItem('activities')) || [];
    const days = Number(sessionStorage.getItem('days'));

    if (activities.length < 1 || days < 1 || days > 14) {
        showToast('Error in creating table (missing information)', 'bg-danger');
        setTimeout(() => {
            window.open('../index.html', '_self');
        }, 3000);
        return;
    }

    const schedule = await handleCreateSchedule(activities, days);

    console.log(schedule);

    await uploadTimeColumn();
    showToast('Calendar page loaded', 'bg-success');
});

async function handleCreateSchedule(activities, days) {
    try {
        const activityDto = new ActivityDto(activities, days);

        const schedule = await createSchedule(activityDto);

        if (!schedule) {
            throw new Error('No schedule returned');
        }
        return schedule;
    } catch (error) {
        showToast(error.message, 'bg-danger');
        setTimeout(() => {
            window.open('../index.html', '_self');
        }, 3000);
    }
}

function uploadTimeColumn() {
    const tableBody = document.getElementById('table-body');

    for (let hour = 0; hour < 24; hour++) {
        let row = document.createElement('tr');

        let timeCell = document.createElement('td');
        timeCell.textContent = `${hour}:00`;
        timeCell.classList.add('time-column');
        timeCell.classList.add('col');
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    }
}