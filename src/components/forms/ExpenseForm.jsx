import * as React from 'react';

/**
 * Display a form for allowing the creation or editing of an Expense.
 */
export const ExpenseForm = props => {
    const { expense, onEditExpense, onSubmit, categories, onClear } = props;

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(expense);
        }}>
            <div className="form-group">
                <label htmlFor="name">Expense Name</label>
                <input type="text" className="form-control" name="name" value={expense.name} onChange={(e) => onEditExpense('name', e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="name">Amount</label>
                <input type="number" className="form-control" name="amount" value={expense.amount} onChange={(e) => onEditExpense('amount', e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="expense_date">Date of Expense</label>
                <input type="date" className="form-control" name="expense_date" value={expense.expense_date} onChange={(e) => onEditExpense('expense_date', e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select type="select" className="form-control" name="category" value={expense.category ? expense.category.id : 0}
                    onChange={(e) => {
                        // Update Expense Category
                        let newCat = {id: 0, name: "-"}
                        if(e.target.value > 0) {
                            // Find the category from our list and set the Expense Category to be that
                            // Use == instead of === to implicity convert value from string to int
                            let catIndex = categories.findIndex(category => category.id == e.target.value);
                            const cat = categories[catIndex];
                            newCat = {id: cat.id, name: cat.name};
                        }
                        onEditExpense('category', newCat);
                    }}
                >
                    <option value={0}>-------------------------</option>
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="submit" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); onClear(); }}>Clear</button>
        </form>
    );
}