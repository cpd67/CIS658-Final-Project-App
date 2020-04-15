import * as React from 'react';
import { ExpenseList } from './ExpenseList';

export const Expenses = props => {
    const { userId } = props;

    // Get expenses for user, then...

    const expenses = [
        { 
            id: 1, 
            name: "Test Expense #1",
            amount: 20.00, 
            expense_date: "2020-04-13", 
            category: {
                id: 1, 
                name: "Test Category #1"
            }
        },
        { 
            id: 2, 
            name: "Test Expense #2", 
            amount: 40.00,
            expense_date: "2020-04-15",
            category: {
                id: 1,
                name: "Test Category #1"
            }
        },
        { 
            id: 3, 
            name: "Test Expense #3", 
            amount: 50.00,
            expense_date: "2020-04-17",
            category: {
                id: 2,
                name: "Test Category #2"
            }
        },
    ];

    return <ExpenseList expenses={expenses} />;
}
