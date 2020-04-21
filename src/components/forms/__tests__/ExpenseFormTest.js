import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ExpenseForm } from '../ExpenseForm';

// Test suite for ExpenseForm
describe('ExpenseForm', () => {
    let defaultProps = {};

    beforeEach(() => {
        defaultProps = {
            expense: {},
            onSubmit: jest.fn(),
            onEditExpense: jest.fn(),
            onClear: jest.fn(),
            categories: []
        }
    });
    it('Renders fields', () => {
        const { container } = render(<ExpenseForm {...defaultProps} />);
        const inputs = container.querySelectorAll('form input');
        const selects = container.querySelectorAll('form select');

        // There should be 3 input fields & 1 select
        expect(inputs.length).toBe(3);
        expect(selects.length).toBe(1);
    });
    it('Renders values when given an Expense', () => {
        defaultProps.categories = [{id: 1, name: "Test Category"}];
        defaultProps.expense = {name: "Test Expense", amount: 20.01, expense_date: "2020-04-10", category: {id: 1, name: "Test Category"}}
        const { container } = render(<ExpenseForm {...defaultProps} />);

        // Assert the form field values are what we expect them to be
        const nameInput = container.querySelector('#name');
        const amountInput = container.querySelector('#amount');
        const expenseDateInput = container.querySelector('#expense_date');
        const categoryInput = container.querySelector('#category');
        expect(nameInput.value).toBe("Test Expense");
        expect(amountInput.value).toBe("20.01");
        expect(expenseDateInput.value).toBe("2020-04-10");
        expect(categoryInput.value).toBe("1");
    });
    it(`Calls onEditExpense when name is changed`, () => {
        const { container } = render(<ExpenseForm {...defaultProps} />);
        const input = container.querySelector(`#name`);
        
        fireEvent.change(input, { target: { value: 'Updated'}});
        // onEditExpense should have been called with the input name & new value
        expect(defaultProps.onEditExpense).toHaveBeenCalledWith('name', 'Updated');
    });
    it(`Calls onEditExpense when amount is changed`, () => {
        const { container } = render(<ExpenseForm {...defaultProps} />);
        const input = container.querySelector(`#amount`);
        
        fireEvent.change(input, { target: { value: '20.00'}});
        // onEditExpense should have been called with the input name & new value
        expect(defaultProps.onEditExpense).toHaveBeenCalledWith('amount', '20.00');
    });
    it(`Calls onEditExpense when expense_date is changed`, () => {
        const { container } = render(<ExpenseForm {...defaultProps} />);
        const input = container.querySelector(`#expense_date`);
        
        fireEvent.change(input, { target: { value: '2020-04-10'}});
        // onEditExpense should have been called with the input name & new value
        expect(defaultProps.onEditExpense).toHaveBeenCalledWith('expense_date', '2020-04-10');
    });
    it(`Calls onEditExpense when category is changed`, () => {
        defaultProps.categories = [{id: 1, name: "Test Category"}]
        const { container } = render(<ExpenseForm {...defaultProps} />);
        const input = container.querySelector(`#category`);
        
        fireEvent.change(input, { target: { value: '1'}});
        // onEditExpense should have been called with the input name & new value
        expect(defaultProps.onEditExpense).toHaveBeenCalledWith('category', {id: 1, name: "Test Category"});
    });
    it('Renders "Submit" & "Clear" buttons', () => {
        const { container } = render(<ExpenseForm {...defaultProps} />);
        const buttons = container.querySelectorAll('form button');

        // There should be two buttons
        expect(buttons.length).toBe(2);

        // Get the button names and assert they are what we expect them to be
        let buttonNames = [];
        buttons.forEach(button => buttonNames.push(button.textContent));
        expect(buttonNames.includes('Submit')).toBe(true);
        expect(buttonNames.includes('Clear')).toBe(true);
    });
    it('Calls onSubmit when form is submitted', () => {
        const { container } = render(<ExpenseForm {...defaultProps} />);
        const form = container.querySelector('form');

        fireEvent.submit(form);
        // onSubmit should have been called
        expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });
    it('Calls onClear when the "Clear" button is clicked', () => {
        defaultProps.expense = {name: "Test Expense", amount: 20.00, expense_date: "2020-04-10", category: {id: 1, name: "Test Category"}}
        const { getByText } = render(<ExpenseForm {...defaultProps} />);
        let clearButton = getByText('Clear');

        fireEvent.click(clearButton);
        // onClear should have been called
        expect(defaultProps.onClear).toHaveBeenCalledTimes(1);
    });
});