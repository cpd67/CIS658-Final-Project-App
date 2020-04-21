import * as React from 'react';

/**
 * Display a form for allowing the creation or editing of a Category.
 */
export const CategoryForm = props => {
    const { category, onSubmit, onEditCategory, onClear } = props;

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(category);
        }}>
            <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input type="text" className="form-control" id="name" name="name" value={category.name} onChange={(e) => onEditCategory('name', e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="submit" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); onClear(); }}>Clear</button>
        </form>
    );
}