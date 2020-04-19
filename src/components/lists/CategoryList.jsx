import * as React from 'react';
import { CategoryListRow } from './CategoryListRow';

export const CategoryList = props => {
    const { categories, onEdit, onDelete } = props;

    return (
        <table className="table table-sm table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 ? (
                    categories.map(category => <CategoryListRow key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />)
                 ) : (
                    <tr>
                        <td colSpan={2}>No categories found. You can add one by filling out the form below.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}