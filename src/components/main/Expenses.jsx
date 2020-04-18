import * as React from 'react';
import { ExpenseList } from '../lists/ExpenseList';
import { apiUrl } from './utils';

export const Expenses = props => {
    const { user } = props;
    const [expensesList, setExpensesList] = React.useState([]);
        
    // Get expenses for user
    const fetchExpenses = () => {
        fetch(`${apiUrl}/users/${user.id}/expenses`).then(res => res.json()).then(data => setExpensesList(data));
    }

    React.useEffect(() => fetchExpenses(), [expensesList.length]);

    return <ExpenseList expenses={expensesList} />;
}
