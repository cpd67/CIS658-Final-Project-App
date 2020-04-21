import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CategoryForm } from '../CategoryForm';

// Test suite for CategoryForm
describe('CategoryForm', () => {
    let defaultProps;
    let inputNames = ['name'];

    beforeEach(() => {
        defaultProps = {
            category: {},
            onSubmit: jest.fn(),
            onEditCategory: jest.fn(),
            onClear: jest.fn()
        }
    });

    it('Renders fields', () => {
        const { container } = render(<CategoryForm {...defaultProps} />);
        const inputs = container.querySelectorAll('form input');

        // There should only be one input field
        expect(inputs.length).toBe(1);
    });
    it('Renders values when given a Category', () => {
        defaultProps.category = {name: "Test Category"}
        const { container } = render(<CategoryForm {...defaultProps} />);
        
        // The name input field should have the Category name
        const nameInput = container.querySelector('#name');
        expect(nameInput.value).toBe("Test Category");
    });
    it('Renders "Submit" & "Clear" buttons', () => {
        const { container } = render(<CategoryForm {...defaultProps} />);
        const buttons = container.querySelectorAll('form button');

        // There should be two buttons
        expect(buttons.length).toBe(2);

        // Get the button names and assert they are what we expect them to be
        let buttonNames = [];
        buttons.forEach(button => buttonNames.push(button.textContent));
        expect(buttonNames.includes('Submit')).toBe(true);
        expect(buttonNames.includes('Clear')).toBe(true);
    });
    inputNames.forEach(inputName => {
        it(`Calls onEditCategory when ${inputName} is changed`, () => {
            const { container } = render(<CategoryForm {...defaultProps} />);
            const input = container.querySelector(`#${inputName}`);
            
            fireEvent.change(input, { target: { value: 'Updated'}});
            // onEditCategory should have been called with the inputName & new value
            expect(defaultProps.onEditCategory).toHaveBeenCalledWith(inputName, 'Updated');
        });
    });
    it('Calls onSubmit when form is submitted', () => {
        const { container } = render(<CategoryForm {...defaultProps} />);
        const form = container.querySelector('form');

        fireEvent.submit(form);
        // onSubmit should have been called
        expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });
    it('Calls onClear when the "Clear" button is clicked', () => {
        defaultProps.category = {name: "Test Category"};
        const { getByText } = render(<CategoryForm {...defaultProps} />);
        let clearButton = getByText('Clear');

        fireEvent.click(clearButton);
        // onClear should have been called
        expect(defaultProps.onClear).toHaveBeenCalledTimes(1);
    });
});