document.addEventListener('DOMContentLoaded', function() {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    for (let hour = 0; hour < 24; hour++) {
        let row = document.createElement('tr');

        let timeCell = document.createElement('td');
        timeCell.textContent = `${hour}:00`;
        timeCell.classList.add('time-column');
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    }
}