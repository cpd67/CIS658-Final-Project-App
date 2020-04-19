import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ExpenseListRow = props => {
    const { expense } = props;
    let { url } = useRouteMatch();

    return (
        <tr>
            <td>{expense.name}</td>
            <td>{expense.amount}</td>
            <td>{expense.expense_date}</td>
            <td>{expense.category ? expense.category.name : "-"}</td>
            <td>
                <div className="btn-group btn-group-sm">
                    <Link to={`${url}/edit/${expense.id}`} className="btn btn-secondary">Edit</Link>
                </div>
            </td>
        </tr>
    )
}