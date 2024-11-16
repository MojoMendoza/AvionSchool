import React, { useState } from 'react';
import './TabButtons.css';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Chart({ users }) {
    const [activeChart, setActiveChart] = useState('budgetVsExpenses');

    const theme = {
        lightBlue: '#007BFF',
        darkerBlue: '#fff',
        textColor: '#2C3E50',
    };

    const budgetVsExpensesData = {
        labels: users.map((user) => user.name),
        datasets: [
            {
                label: 'Budget',
                data: users.map((user) => user.balance),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Total Expenses',
                data: users.map((user) => user.expenses.reduce((total, expense) => total + expense.amount, 0)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const budgetVsExpensesOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: theme.textColor,
                },
            },
            title: {
                display: true,
                text: 'Budget vs Expenses',
                color: theme.textColor,
            },
        },
        scales: {
            x: {
                grid: {
                    color: theme.darkerBlue,
                },
                ticks: {
                    color: theme.textColor,
                },
            },
            y: {
                grid: {
                    color: theme.darkerBlue,
                },
                ticks: {
                    color: theme.textColor,
                },
            },
        },
    };

    const allExpenses = users.flatMap((user) => user.expenses);
    const groupedExpenses = allExpenses.reduce((acc, expense) => {
        const date = expense.date.slice(0, 7);
        if (!acc[date]) acc[date] = 0;
        acc[date] += expense.amount;
        return acc;
    }, {});

    const dateVsExpensesData = {
        labels: Object.keys(groupedExpenses),
        datasets: [
            {
                label: 'Total Expenses',
                data: Object.values(groupedExpenses),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const dateVsExpensesOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: theme.textColor,
                },
            },
            title: {
                display: true,
                text: 'Date vs Expenses',
                color: theme.textColor,
            },
        },
        scales: {
            x: {
                grid: {
                    color: theme.darkerBlue,
                },
                ticks: {
                    color: theme.textColor,
                },
            },
            y: {
                grid: {
                    color: theme.darkerBlue,
                },
                ticks: {
                    color: theme.textColor,
                },
            },
        },
    };

    const totalBudgetData = {
        labels: users.map((user) => user.name),
        datasets: [
            {
                label: 'Total Budget',
                data: users.map((user) => user.balance),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                hoverOffset: 4,
            },
        ],
    };

    const totalBudgetOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: theme.textColor,
                },
            },
            title: {
                display: true,
                text: 'Total Budget Distribution',
                color: theme.textColor,
            },
        },
    };

    return (
        <div style={{ backgroundColor: theme.darkerBlue, color: theme.textColor, padding: '20px' }}>

            <div className='chart-buttons'>
                <button
                    onClick={() => setActiveChart('budgetVsExpenses')}
                    className={activeChart === 'budgetVsExpenses' ? 'active' : ''}
                    style={{ marginRight: '10px' }}
                >
                    Budget vs Expenses
                </button>
                <button
                    onClick={() => setActiveChart('dateVsExpenses')}
                    className={activeChart === 'dateVsExpenses' ? 'active' : ''}
                    style={{ marginRight: '10px' }}
                >
                    Date vs Expenses
                </button>
                <button
                    onClick={() => setActiveChart('totalBudget')}
                    className={activeChart === 'totalBudget' ? 'active' : ''}
                    style={{ marginRight: '10px' }}
                >
                    Total Budget
                </button>
            </div>

            <div style={{ width: '100%', height: '400px', marginTop: '20px', overflow: 'auto' }}>
                {activeChart === 'budgetVsExpenses' && <Bar data={budgetVsExpensesData} options={budgetVsExpensesOptions} />}
                {activeChart === 'dateVsExpenses' && <Line data={dateVsExpensesData} options={dateVsExpensesOptions} />}
                {activeChart === 'totalBudget' && <Pie data={totalBudgetData} options={totalBudgetOptions} />}
            </div>
        </div>
    );
}

export default Chart;
