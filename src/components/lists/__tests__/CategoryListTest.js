import * as React from 'react';
import { render } from '@testing-library/react';
import { CategoryList } from '../CategoryList';

// Test suite for CategoryList
describe('CategoryList', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            categories: [],
            onEdit: jest.fn(),
            onDelete: jest.fn()
        }
    });
    it('Renders empty message when given no categories', () => {
        const { getAllByText } = render(<CategoryList {...defaultProps} />);
        const trElems = getAllByText('No categories found', { exact: false});

        expect(trElems.length).toBe(1);
    });
    it('Renders categories', () => {
        defaultProps.categories = [{id: 1, name: "Test"}, {id: 2, name: "Test 2"}];
        const { container } = render(<CategoryList {...defaultProps} />);

        const trElems = container.querySelectorAll('tbody tr');
        expect(trElems.length).toBe(2);
    });
});