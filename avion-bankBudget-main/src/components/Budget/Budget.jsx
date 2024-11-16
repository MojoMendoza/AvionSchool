import { useState } from "react";
import "./Budget.css";
import AccountList from "../Budget/AccountList";
import Chart from "../Budget/Chart";
import Expense from "../Budget/Expense";
import TabButtons from "../Budget/TabButtons";
import ExpenseForm from "../Budget/ExpenseFrom";

// npm install chart.js react-chartjs-2

function Budget({ users, expenses, setExpenses, setUsers }) {

    const [activeTab, setActiveTab] = useState('AccountList');

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const deleteExpense = (userId, expenseId) => {
        setUsers(prevUsers => {
            return prevUsers.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        expenses: user.expenses.filter(expense => expense.id !== expenseId),
                    };
                }
                return user;
            });
        });
    };

    let content;


    if (activeTab === 'AccountList') {
        content =
            <>
                <h2>Account List</h2>
                <AccountList users={users} />
            </>
    }

    if (activeTab === 'Charts') {
        content =
            <>
                <h2>Charts</h2>
                <Chart users={users} />
            </>
    }
    if (activeTab === 'Expenses') {
        content =
            <>
                <h2>Expenses</h2>
                <Expense users={users} deleteExpense={deleteExpense} />
            </>
    }


    return (
        <>
            <ExpenseForm addExpense={addExpense} setUsers={setUsers} users={users} />
            <div className="budget">

                <div id="">
                    <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
                    {content}
                </div>

            </div>
        </>
    );
}

export default Budget;
