import * as React from 'react';

export const CategoryForm = props => {
    const { category, onSubmit, onEditCategory } = props;

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(category);
        }}>
            <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input type="text" className="form-control" name="name" value={category.name} onChange={(e) => onEditCategory('name', e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}