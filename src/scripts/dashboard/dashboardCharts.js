/**
 * Dashboard charts initialization
 * Creates and initializes chart visualizations using Chart.js
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize traffic chart
    const trafficChartEl = document.getElementById('trafficChart');
    if (trafficChartEl) {
        const trafficChartCtx = trafficChartEl.getContext('2d');
        
        // Gradient fill for the area under the graph
        const gradient = trafficChartCtx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); // Blue with opacity
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)'); // Transparent
        
        // Chart data - normally you would fetch this from an API
        const trafficData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Page Views',
                data: [1200, 1900, 1500, 2100, 2300, 1800, 3000, 4200, 3800, 3200, 3600, 4800],
                borderColor: '#3b82f6', // Blue
                backgroundColor: gradient,
                tension: 0.4, // Smooth curve
                fill: true,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        };
        
        // Chart configuration
        new Chart(trafficChartCtx, {
            type: 'line',
            data: trafficData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        bodyFont: {
                            size: 13
                        },
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [2, 2],
                            color: '#334155'
                        },
                        ticks: {
                            color: '#94a3b8',
                            callback: function(value) {
                                if (value >= 1000) {
                                    return `${value/1000}k`;
                                }
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }
});
