import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import API from '../../main/API';
import { SignupForm } from '../SignupForm';

// https://stackoverflow.com/questions/58392815/how-to-mock-usehistory-hook-in-jest
// Mock the useHistory() hook from React Router
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: jest.fn()
    })
}));

// Mock the signupUser() API function
jest.mock('../../main/API');
API.signupUser = jest.fn((values) => {
    let data = {user: {id: 1, username: "Test"}}

    return new Promise((resolve) => resolve(data));
});

describe('SignupForm', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            onSubmit: jest.fn()
        }
    });

    it('Renders fields', () => {
        const { container } = render(<SignupForm {...defaultProps} />);
        const inputs = container.querySelectorAll('form input');

        // Assert it renders five fields
        expect(inputs.length).toBe(5);
    });
    it('Renders "Sign up!" button', () => {
        const { container } = render(<SignupForm {...defaultProps} />);
        const buttons = container.querySelectorAll('button');

        // Assert only one button was rendered
        expect(buttons.length).toBe(1);
        expect(buttons[0].textContent).toBe("Sign up!")
    });
    it('Calls onSubmit when form is submitted', async () => {
        const { container } = render(<SignupForm {...defaultProps} />);
        const firstNameInput = container.querySelector('#firstName');
        const lastNameInput = container.querySelector('#lastName');
        const usernameInput = container.querySelector('#username');
        const passwordInput = container.querySelector('#password');
        const confirmPasswordInput = container.querySelector('#confirmPassword');
        const form = container.querySelector('form');

        await waitFor(() => {
            fireEvent.change(firstNameInput, {target: { value: 'Jimmy'}});
        });
        await waitFor(() => {
            fireEvent.change(lastNameInput, {target: { value: 'Timmy'}});
        });
        await waitFor(() => {
            fireEvent.change(usernameInput, {target: { value: 'jtim'}});
        });
        await waitFor(() => {
            fireEvent.change(passwordInput, {target: { value: 'test'}});
        });
        await waitFor(() => {
            fireEvent.change(confirmPasswordInput, {target: { value: 'test'}});
        });
        await waitFor(() => {
            fireEvent.submit(form);
        });
        
        // Assert onSubmit was called
        expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    })
});