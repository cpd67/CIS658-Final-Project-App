import * as React from 'react';
import Chart from "chart.js";
import { apiUrl, transformExpenseData } from './utils';

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
                data: chartData
            });
        });
    };

    React.useEffect(() => fetchExpenses(), [chartRef]);

    return (
        <canvas id="expenseChart" ref={chartRef}></canvas>
    );
}