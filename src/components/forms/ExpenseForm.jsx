import * as React from 'react';

export const ExpenseForm = props => {
    const { expense, onEditExpense, onSubmit, categories } = props;

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(expense);
        }}>
            <div className="form-group">
                <label htmlFor="name">Expense Name</label>
                <input type="text" className="form-control" name="name" value={expense.name} onChange={(e) => onEditExpense('name', e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="name">Amount</label>
                <input type="number" className="form-control" name="amount" value={expense.amount} onChange={(e) => onEditExpense('amount', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="expense_date">Date of Expense</label>
                <input type="text" className="form-control" name="expense_date" value={expense.expense_date} onChange={(e) => onEditExpense('expense_date', e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select type="select" className="form-control" name="categoryId" value={expense.category ? expense.category.id : -1}
                        onChange={(e) => {onEditExpense('category', e.target.value > 0 ? {id: e.target.value, name: categories[e.target.value - 1].name} : {})}}
                >
                    <option value={0}>-------------------------</option>
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}