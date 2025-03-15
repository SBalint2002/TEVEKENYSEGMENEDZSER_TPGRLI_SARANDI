import {showToast} from "../utils/uiUtils.js";
import {getHelloWorld} from "../services/calendarService.js";

let activities = [];

document.addEventListener('DOMContentLoaded', async () => {
    activities = JSON.parse(sessionStorage.getItem('activities')) || [];

    if (activities.length < 1) {
        showToast('No activites found', 'bg-danger');
        setTimeout(() => {
            window.open('../index.html', '_self');
        }, 3000);
        return;
    }

    showToast('Calendar page loaded', 'bg-success');

    await uploadTimeColumn();
});

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