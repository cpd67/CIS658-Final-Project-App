export const apiUrl = "http://localhost:3001";

export default class API {
    static fetchExpenses(user) {
        return fetch(`${apiUrl}/users/${user.id}/expenses`).then(res => res.json());
    }

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

    static deleteExpense(user, expenseId) {
        return fetch(`${apiUrl}/users/${user.id}/expenses/${expenseId}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.text());
    };

    static fetchCategories(user) {
        return fetch(`${apiUrl}/users/${user.id}/categories`).then(res => res.json());
    }

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

    static deleteCategory(user, catId) {
        return fetch(`${apiUrl}/users/${user.id}/categories/${catId}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.text());
    };

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

    static logoutUser() {
        return fetch(`${apiUrl}/logout`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json());
    }

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

    static fetchLoginStatus() {
        return fetch(`${apiUrl}/logged_in`, {
          method: 'GET',
          credentials: 'include'
        }).then(res => res.json());
    }
}