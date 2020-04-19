import * as React from 'react';
import { ExpenseList } from '../lists/ExpenseList';
import { ExpenseForm } from '../forms/ExpenseForm';
import { apiUrl } from './utils';

export const Expenses = props => {
    const { user } = props;
    const [expensesList, setExpensesList] = React.useState([]);
    const [currentExpense, setCurrentExpense] = React.useState({});
    const [formMode, setFormMode] = React.useState('new');
    const [categories, setCategories] = React.useState([]);

    const fetchCategories = () => {
        fetch(`${apiUrl}/users/${user.id}/categories`).then(res => res.json()).then(data => {
            if(data) {
                console.log(data);
                setCategories(data);
            }
        });
    }

    // Get expenses for user
    const fetchExpenses = () => {
        fetch(`${apiUrl}/users/${user.id}/expenses`).then(res => res.json()).then(data => setExpensesList(data));
    }
    React.useEffect(() => fetchExpenses(), [expensesList.length]);
    React.useEffect(() => fetchCategories(), [categories.length]);

    const createExpense = newExpense => {
        let newData = {
            name: newExpense.name,
            amount: newExpense.amount,
            expense_date: newExpense.expense_date,
            user_id: newExpense.user_id
        }
        if(newExpense.category && newExpense.category.id > 0) {
            newData['category_id'] = newExpense.category.id;
        } else {
            newData['category_id'] = null;
        }

        fetch(`${apiUrl}/users/${user.id}/expenses`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: "include",
            body: JSON.stringify(newData)
        }).then(res => res.json()).then(data => {
            if(data.errors) {
                console.error(data.errors);
            } else {
                setExpensesList([...expensesList, newExpense]);
            }
        });
    }
    const editExpense = updatedExpense => {
        let updateData = {
            name: updatedExpense.name,
            amount: updatedExpense.amount,
            expense_date: updatedExpense.expense_date,
            user_id: updatedExpense.user_id
        }
        if(updatedExpense.category && updatedExpense.category.id > 0) {
            updateData['category_id'] = updatedExpense.category.id;
        } else {
            updateData['category_id'] = null;
        }

        fetch(`${apiUrl}/users/${user.id}/expenses/${updatedExpense.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: "include",
            body: JSON.stringify(updateData)
        }).then(res => res.text()).then(data => {
            if(!data) {
                let newExpensesList = [...expensesList];
                let expenseIndex = expensesList.findIndex((expense) => expense.id === currentExpense.id);
                newExpensesList[expenseIndex] = currentExpense;
                setExpensesList(newExpensesList);
            } else {
                console.log("Failed to update Expense because: " + data);
            }
        });
    };
    const deleteExpense = expenseId => {
        fetch(`${apiUrl}/users/${user.id}/expenses/${expenseId}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.text()).then(data => {
            if(!data) {
                setExpensesList(expensesList.filter((expense) => expense.id !== expenseId));
            } else {
                console.log("Failed to delete Expense because: " + data);
            }
        })
    };

    const onEditExpense = (field, value) => {
        let newExpense = { ...currentExpense };
        newExpense[field] = value;
        setCurrentExpense(newExpense);
    }
    const onEdit = expense => {
        setFormMode('edit');
        setCurrentExpense(expense);
    }

    return (
        <>
            <ExpenseList expenses={expensesList} onEdit={onEdit} onDelete={deleteExpense} />
            <ExpenseForm expense={currentExpense}
                onSubmit={formMode === 'new' ? createExpense : editExpense} categories={categories}
                onEditExpense={onEditExpense}
            />
        </>
    );
}
