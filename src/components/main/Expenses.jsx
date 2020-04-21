import * as React from 'react';
import { ExpenseList } from '../lists/ExpenseList';
import { ExpenseForm } from '../forms/ExpenseForm';
import API from '../main/API';

/**
 * Display a list of Expenses for the currently logged-in User.
 *
 * Show form for creating, editing Expenses.
 *
 * The following resources were helpful when writing this component:
 * https://github.com/kurmasz-SampleCode/CIS371-SampleCode/blob/master/react-blog-complete/src/components/Authors.jsx
 */
export const Expenses = props => {
    const { user } = props;
    const [expensesList, setExpensesList] = React.useState([]);
    const defaultExpense = {name: "", amount: 0.00, expense_date: ""}
    const [currentExpense, setCurrentExpense] = React.useState(defaultExpense);
    const [formMode, setFormMode] = React.useState('new');
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        API.fetchExpenses(user).then(data => {
            setExpensesList(data);
        })
    }, [expensesList.length]);
    React.useEffect(() => {
        API.fetchCategories(user).then(data => {
            if(data) {
                setCategories(data);
            }
        })
    }, [categories.length]);

    const onSubmit = (expenseInfo) => {
        if(formMode === 'new') {
            API.createExpense(user, expenseInfo).then(data => {
                if(data.errors) {
                    console.error(data.errors);
                } else {
                    setExpensesList([...expensesList, expenseInfo]);
                }
            });
        } else {
            API.updateExpense(user, expenseInfo).then(data => {
                if(!data) {
                    let newExpensesList = [...expensesList];
                    let expenseIndex = expensesList.findIndex((expense) => expense.id === currentExpense.id);
                    newExpensesList[expenseIndex] = currentExpense;
                    setExpensesList(newExpensesList);
                } else {
                    console.log("Failed to update Expense because: " + data);
                }
            });
        }
    }

    const onEditExpense = (field, value) => {
        let newExpense = { ...currentExpense };
        newExpense[field] = value;
        setCurrentExpense(newExpense);
    }
    const onEdit = expense => {
        setFormMode('edit');
        setCurrentExpense(expense);
    }
    const onDelete = (expenseId) => {
        API.deleteExpense(user, expenseId).then(data => {
            if(!data) {
                setExpensesList(expensesList.filter((expense) => expense.id !== expenseId));
            } else {
                console.log("Failed to delete Expense because: " + data);
            }
        });
    }
    const onClear = () => {
        setFormMode('new');
        setCurrentExpense(defaultExpense);
    }

    return (
        <>
            <ExpenseList expenses={expensesList} onEdit={onEdit} onDelete={onDelete} />
            <ExpenseForm expense={currentExpense} categories={categories} onSubmit={onSubmit} onEditExpense={onEditExpense} onClear={onClear} />
        </>
    );
}
