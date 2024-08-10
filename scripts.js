document.addEventListener('DOMContentLoaded', () => {
    
    const rows = document.querySelectorAll('table.attendance-summary-table tbody tr');

    rows.forEach(row => {
        const canvas = row.querySelector('canvas');
        if (canvas) {
            const present = parseInt(row.querySelector('td:nth-child(4)').textContent, 10);
            const total = parseInt(row.querySelector('td:nth-child(3)').textContent, 10);
            const canvasId = canvas.id;

            renderChart(canvasId, present, total);
        }
    });
});

function renderChart(canvasId, present, total) {
    const percentage = (present / total) * 100;
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [Math.min(percentage, 100), Math.max(100 - percentage, 0)],
                backgroundColor: [percentage < 75 ? '#F44336' : '#4CAF50', '#ddd']
            }],
            labels: ['Attendance', 'Remaining']
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
