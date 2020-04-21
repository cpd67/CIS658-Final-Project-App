import * as React from 'react';

/**
 * Display details about a particular Expense.
 */
export const ExpenseListRow = props => {
    const { expense, onEdit, onDelete } = props;

    return (
        <tr>
            <td>{expense.name}</td>
            <td>{expense.amount}</td>
            <td>{expense.expense_date}</td>
            <td>{expense.category ? expense.category.name : "-"}</td>
            <td>
                <div className="btn-group btn-group-sm">
                    <button type="button" onClick={(e) => {onEdit(expense)}} className="btn btn-secondary">Edit</button>
                    <button type="button" onClick={(e) => onDelete(expense.id)} className="btn btn-danger">Delete</button>
                </div>
            </td>
        </tr>
    )
}