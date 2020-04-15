import * as React from 'react';
import { ExpenseListRow } from './ExpenseListRow';

export const ExpenseList = props => {
    const { expenses } = props;

    return (
        <table className="table table-sm table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => <ExpenseListRow key={expense.id} expense={expense} />)}
            </tbody>
        </table>
    )
}