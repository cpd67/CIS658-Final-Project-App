import * as React from 'react';
import { ExpenseList } from './ExpenseList';
import { apiUrl } from './utils';

export const Expenses = props => {
    const { userId } = props;
    const [expensesList, setExpensesList] = React.useState([
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
    ]);
        
    // Get expenses for user
    const fetchExpenses = () => {
        fetch(`${apiUrl}users/${userId}/expenses`
        ).then(res => res.json()
        ).then(data => setExpensesList(data));
    }

    React.useEffect(() => fetchExpenses());

    return <ExpenseList expenses={expensesList} />;
}
