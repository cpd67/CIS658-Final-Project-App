import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ExpenseListRow } from '../ExpenseListRow';

// Test suite for ExpenseListRow
describe('ExpenseListRow', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            expense: {id: 1, name: "Test Expense", amount: 20.01, expense_date: "2020-04-10"},
            onEdit: jest.fn(),
            onDelete: jest.fn()
        }
    });
    it('Renders expense', () => {
        const { getByText } = render(<ExpenseListRow {...defaultProps} />);

        getByText('Test Expense');
        getByText('20.01');
        getByText('2020-04-10');
        // No category was passed, so we render a default value
        getByText('-');
    });
    it('Renders expense with category', () => {
        defaultProps.expense.category = {id: 1, name: "Test Category"}
        const { getByText } = render(<ExpenseListRow {...defaultProps} />);

        getByText('Test Expense');
        getByText('20.01');
        getByText('2020-04-10');
        getByText('Test Category');
    });
    it('Renders edit & delete buttons', () => {
        const { container } = render(<ExpenseListRow {...defaultProps} />);
        const buttons = container.querySelectorAll('button');

        expect(buttons.length).toBe(2);

        // Get the button names and assert they are what we expect them to be
        let buttonNames = [];
        buttons.forEach(button => buttonNames.push(button.textContent));
        expect(buttonNames.includes('Edit')).toBe(true);
        expect(buttonNames.includes('Delete')).toBe(true);        
    });
    it('Calls onEdit when edit button is clicked', () => {
        const { getByText } = render(<ExpenseListRow {...defaultProps} />);
        let editButton = getByText('Edit');

        fireEvent.click(editButton);
        // onEdit should have been called
        expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
    });
    it('Calls onDelete when delete button is clicked', () => {
        const { getByText } = render(<ExpenseListRow {...defaultProps} />);
        let deleteButton = getByText('Delete');

        fireEvent.click(deleteButton);
        // onDelete should have been called
        expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
    });
});