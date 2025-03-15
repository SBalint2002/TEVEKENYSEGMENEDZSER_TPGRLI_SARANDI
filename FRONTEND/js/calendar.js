document.addEventListener('DOMContentLoaded', async () => {
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