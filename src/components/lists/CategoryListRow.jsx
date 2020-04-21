import * as React from 'react';

/**
 * Display details about a particular Category.
 */
export const CategoryListRow = props => {
    const { category, onEdit, onDelete } = props;

    return (
        <tr>
            <td>{category.name}</td>
            <td>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-secondary" onClick={(e) => onEdit(category)}>Edit</button>
                    <button className="btn btn-danger" onClick={(e) => onDelete(category.id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
}