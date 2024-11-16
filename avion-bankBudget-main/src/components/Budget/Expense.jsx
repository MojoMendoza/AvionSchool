import React from 'react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

function Expense({ users, deleteExpense }) {
    return (
        <div>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Action</th> {/* Add a column for delete button */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return user.expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{user.name}</td>
                                <td>{expense.description}</td>
                                <td className='text-right'>{formatter.format(expense.amount)}</td>
                                <td>{expense.category || 'N/A'}</td>
                                <td>{expense.date}</td>
                                <td>
                                    <button
                                        onClick={() => deleteExpense(user.id, expense.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ));
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Expense;
