import * as React from 'react';
import { render, fireEvent, waitFor, wait } from '@testing-library/react';
import API from '../../main/API';
import { LoginForm } from '../LoginForm';

// https://stackoverflow.com/questions/58392815/how-to-mock-usehistory-hook-in-jest
// Mock the useHistory() hook from React Router
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: jest.fn()
    })
}));

// Mock the loginUser() API function
jest.mock('../../main/API');
API.loginUser = jest.fn((values) => {
    let data = {user: {id: 1, username: "Test"}}

    return new Promise((resolve) => resolve(data));
});

// Test suite for LoginForm
describe('LoginForm', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            onSubmit: jest.fn()
        }
    });
    it('Renders fields', () => {
        const { container } = render(<LoginForm {...defaultProps} />);
        const inputs = container.querySelectorAll('form input');        

        // Assert it renders two fields
        expect(inputs.length).toBe(2);
    });
    it('Renders "Log in" button', () => {
        const { container } = render(<LoginForm {...defaultProps} />);
        const buttons = container.querySelectorAll('button');
        
        // Asser there was only one button rendered
        expect(buttons.length).toBe(1);
        expect(buttons[0].textContent).toBe("Log in")
    });
    it('Calls onSubmit when form is submitted', async () => {
        const { container } = render(<LoginForm {...defaultProps} />);
        const usernameInput = container.querySelector('#username');
        const passwordInput = container.querySelector('#password');
        const form = container.querySelector('form');
        
        // https://hackernoon.com/react-forms-with-formik-and-unit-testing-with-react-testing-library-j0b32c9
        // https://github.com/testing-library/dom-testing-library/issues/477
        // Had to follow one of the solutions in the above issue (install jest-environment-jsdom-sixteen & update package.json tesct script)
        // because create-react-app uses an old version of jsdom, so the below would not have worked. 
        await waitFor(() => {
            fireEvent.change(usernameInput, {target: { value: 'test'}});
        });
        await waitFor(() => {
            fireEvent.change(passwordInput, {target: { value: 'test'}});
        });
        await waitFor(() => {
            fireEvent.submit(form);
        });

        // Assert onSubmit was called
        expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });
});