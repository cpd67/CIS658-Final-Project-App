import * as React from 'react';

export const ExpenseListRow = props => {
    const { expense } = props;

    return (
        <tr>
            <td>{expense.name}</td>
            <td>{expense.amount}</td>
            <td>{expense.expense_date}</td>
            <td>{expense.category.name}</td>
            <td>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-secondary" onClick={(e) => console.log('Flappy Edit!')}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={(e) => console.log('Flappy Delete')}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}