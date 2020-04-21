import * as React from 'react';
import { ExpenseListRow } from './ExpenseListRow';

export const ExpenseList = props => {
    const { expenses, onEdit, onDelete } = props;

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
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
                    {expenses.length > 0 ? (
                        expenses.map(expense => <ExpenseListRow key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />)
                    ) : (
                        <tr>
                            <td key={0} colSpan={5}>No expenses found. You can add one by filling out the form below.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}