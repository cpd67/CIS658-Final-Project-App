import * as React from 'react';
import Chart from "chart.js";
import { ErrorMessage } from '../main/ErrorMessage'
import { transformExpenseData } from './utils';
import API from './API';

/**
 * Display a Chart of the currently logged-in User's yearly Expenses.
 *
 * The following resources were helpful when writing this component:
 * https://blog.bitsrc.io/customizing-chart-js-in-react-2199fa81530a
 * https://stackoverflow.com/questions/54620698/whats-the-difference-between-useref-and-createref
 * https://www.chartjs.org/docs/latest/general/responsive.html#important-note
 */
export const ExpenseChart = props => {
    const { user } = props;
    const [errorMessage, setErrorMessage] = React.useState("");
    const chartRef = React.useRef(null);

    React.useEffect(() => {
        API.fetchExpenses(user).then(data => {
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
                    responsive: true,
                    layout: 50
                }
            });
        }).catch(message => {
            setErrorMessage(message);
        });
    }, [chartRef]);

    return (
        <div className="chart-container">
            <ErrorMessage message={errorMessage} />
            <canvas id="expenseChart" ref={chartRef}></canvas>
        </div>
    );
}