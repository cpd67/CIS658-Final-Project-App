export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://money-trail-api.herokuapp.com' : "http://localhost:3001";

/**
 * Encapsulates logic for making API calls and getting data.
 *
 * The following resource was helpful in writing this class:
 * https://github.com/kurmasz-SampleCode/CIS371-SampleCode/blob/master/react-blog-complete/src/API.jsx
 *
 */
export default class API {
    // Get Expenses for a User
    static fetchExpenses(user) {
        return fetch(`${apiUrl}/users/${user.id}/expenses`, {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json());
    }

    // Create new expense
    static createExpense(user, newExpense) {
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

        return fetch(`${apiUrl}/users/${user.id}/expenses`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: "include",
            body: JSON.stringify(newData)
        }).then(res => res.json());
    }

    // Update an Expense
    static updateExpense(user, updatedExpense) {
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

        return fetch(`${apiUrl}/users/${user.id}/expenses/${updatedExpense.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: "include",
            body: JSON.stringify(updateData)
        }).then(res => res.text());
    };

    // Delete an Expense
    static deleteExpense(user, expenseId) {
        return fetch(`${apiUrl}/users/${user.id}/expenses/${expenseId}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.text());
    };

    // Get Categories for a User
    static fetchCategories(user) {
        return fetch(`${apiUrl}/users/${user.id}/categories`, {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json());
    }

    // Create a Category
    static createCategory(user, newCategory) {
        return fetch(`${apiUrl}/users/${user.id}/categories`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: 'include',
            body: JSON.stringify(newCategory)
        }).then(res => res.json());
    }
    
    // Update a Category
    static updateCategory(user, updatedCategory) {
        return fetch(`${apiUrl}/users/${user.id}/categories/${updatedCategory.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: 'include',
            body: JSON.stringify(updatedCategory)
        }).then(res => res.text());
    };

    // Delete a Category
    static deleteCategory(user, catId) {
        return fetch(`${apiUrl}/users/${user.id}/categories/${catId}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.text());
    };

    // Log a User in
    static loginUser(userInfo) {
        return fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: 'include',
            body: JSON.stringify(userInfo)
        }).then(res => res.json());
    };

    // Log a User out
    static logoutUser() {
        return fetch(`${apiUrl}/logout`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json());
    }

    // Sign a User up
    static signupUser(userInfo) {
        return fetch(`${apiUrl}/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: 'include',
            body: JSON.stringify(userInfo)
        }).then(res => res.json());
    }

    // Get login status of a User
    static fetchLoginStatus() {
        return fetch(`${apiUrl}/logged_in`, {
          method: 'GET',
          credentials: 'include'
        }).then(res => res.json());
    }
}