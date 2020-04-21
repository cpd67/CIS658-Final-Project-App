import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CategoryListRow } from '../CategoryListRow';

// Test suite for CategoryListRow
describe('CategoryListRow', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            category: {id: 1, name: "Test Category"},
            onEdit: jest.fn(),
            onDelete: jest.fn()
        }
    });
    it('Renders category', () => {
        const { getByText } = render(<CategoryListRow {...defaultProps} />);

        getByText('Test Category');
    });
    it('Renders edit & delete buttons', () => {
        const { container } = render(<CategoryListRow {...defaultProps} />);
        const buttons = container.querySelectorAll('button');

        expect(buttons.length).toBe(2);

        // Get the button names and assert they are what we expect them to be
        let buttonNames = [];
        buttons.forEach(button => buttonNames.push(button.textContent));
        expect(buttonNames.includes('Edit')).toBe(true);
        expect(buttonNames.includes('Delete')).toBe(true);        
    });
    it('Calls onEdit when edit button is clicked', () => {
        const { getByText } = render(<CategoryListRow {...defaultProps} />);
        let editButton = getByText('Edit');

        fireEvent.click(editButton);
        // onEdit should have been called
        expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
    });
    it('Calls onDelete when delete button is clicked', () => {
        const { getByText } = render(<CategoryListRow {...defaultProps} />);
        let deleteButton = getByText('Delete');

        fireEvent.click(deleteButton);
        // onDelete should have been called
        expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
    });
});