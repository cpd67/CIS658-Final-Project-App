import * as React from 'react';
import { CategoryListRow } from './CategoryListRow';

export const CategoryList = props => {
    const { categories } = props;

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
                    categories.map(category => <CategoryListRow key={category.id} category={category} />)
                 ) : (
                    <tr>
                        <td colSpan={2}>No categories found. You can add some by clicking the + button on the top right. </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}