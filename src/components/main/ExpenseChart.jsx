import * as React from 'react';
import Chart from "chart.js";
import { apiUrl, transformExpenseData } from './utils';

// https://blog.bitsrc.io/customizing-chart-js-in-react-2199fa81530a
export const ExpenseChart = props => {
    const { user } = props;
    const chartRef = React.useRef(null);

    const fetchExpenses = () => {
        fetch(`${apiUrl}/users/${user.id}/expenses`).then(res => res.json()).then(data => {
            const chart = chartRef.current.getContext("2d");
            
            let chartData = {
                labels: ["Months"],
                datasets: []
            }
            if(data.length > 0) {
                // Transform data - {month: amount}
                const expenseData = transformExpenseData(data);

                // Use it as chartData
                chartData = {
                    labels: Object.keys(expenseData),
                    datasets: [
                        {
                            label: "Expenses",
                            data: Object.values(expenseData)
                        }
                    ]
                }
            }

            new Chart(chart, {
                type: "line",
                data: chartData,
                options: {
                    responsive: true
                }
            });
        });
    };

    React.useEffect(() => fetchExpenses(), [chartRef]);

    return (
        // Response chart: https://www.chartjs.org/docs/latest/general/responsive.html#important-note
        <div className="chart-container">
            <canvas id="expenseChart" ref={chartRef}></canvas>
        </div>
    );
}