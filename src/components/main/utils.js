export const transformExpenseData = expenses => {
    const year = new Date().getFullYear();

    // Get expenses for the year
    let yearExpenses = expenses.filter(expense => new Date(expense.expense_date).getFullYear() === year);

    // Transform the expense data in this form: {Month: Amount}
    let transformedData = {Jan: 0.00, Feb: 0.00, Mar: 0.00, Apr: 0.00, May: 0.00,
                           Jun: 0.00, Jul: 0.00, Aug: 0.00, Sep: 0.00, Oct: 0.00,
                           Nov: 0.00, Dec: 0.00
                        }
    for(let i = 0; i < yearExpenses.length; i++) {
        let expense = yearExpenses[i];

        // https://stackoverflow.com/questions/1643320/get-month-name-from-date
        let expenseDate = new Date(expense.expense_date);
        let month = expenseDate.toLocaleString('default', {month: 'short'});
        transformedData[month] += expense.amount;
    }

    return transformedData;
}