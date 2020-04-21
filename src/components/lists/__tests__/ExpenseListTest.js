import * as React from 'react';
import { render } from '@testing-library/react';
import { ExpenseList } from '../ExpenseList';

// Test suite for ExpenseList
describe('ExpenseList', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            expenses: [],
            onEdit: jest.fn(),
            onDelete: jest.fn()
        }
    });
    it('Renders empty message when given no expenses', () => {
        const { getAllByText } = render(<ExpenseList {...defaultProps} />);
        const trElems = getAllByText('No expenses found', { exact: false});

        expect(trElems.length).toBe(1);
    });
    it('Renders expenses', () => {
        defaultProps.expenses = [{id: 1, name: "Test", amount: 20.00, expense_date: "2020-04-10"}, 
                                 {id: 2, name: "Test 2", amount: 40.00, expense_date: "2020-04-11"}
                                ];
        const { container } = render(<ExpenseList {...defaultProps} />);

        const trElems = container.querySelectorAll('tbody tr');
        expect(trElems.length).toBe(2);
    });
});