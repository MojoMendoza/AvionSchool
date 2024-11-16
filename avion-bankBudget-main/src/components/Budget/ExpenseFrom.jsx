import { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ users, setUsers }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [userName, setUserName] = useState('');

    const userExist = (name) => {
        return users.find((user) => user.name === name);
    };

    const addExpenseToUser = (userName, expense) => {
        const updatedUsers = users.map((user) => {
            if (user.name === userName) {
                return {
                    ...user,
                    expenses: [...user.expenses, expense],
                };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userExist(userName) && description && amount) {
            const newExpense = {
                description,
                amount: parseFloat(amount),
                category,
                date,
                id: new Date().getTime(),
            };

            addExpenseToUser(userName, newExpense);

            alert('Expense Added to ' + userName);
            setDescription('');
            setAmount('');
            setCategory('');
            setDate('');
            setUserName('');
        } else {
            alert('User not found or invalid form data');
        }
    };

    return (
        <form className="expenseForm" onSubmit={handleSubmit}>
            {/* <pre>{JSON.stringify(users)}</pre> */}
            <label>Account: </label>
            <select
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                required
            >
                <option value="">Select Account</option>
                {users.map((user) => (
                    <option key={user.name} value={user.name}>
                        {user.name}
                    </option>
                ))}
            </select>
            <br />
            <label>Expense Description: </label>
            <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
            />
            <br />
            <label>Amount: </label>
            <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
            />
            <br />
            <label>Category (Optional): </label>
            <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />
            <br />
            <label>Date (Optional): </label>
            <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
            />
            <br />
            <button>Confirm Expense</button>
        </form>
    );
}

export default ExpenseForm;
