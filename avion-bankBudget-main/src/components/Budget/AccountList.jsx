import './AccountList.css';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

function AccountList({ users }) {
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Balance</th>
                    <th>Expenses</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    const totalExpenses = user.expenses ? user.expenses.reduce((total, expense) => total + expense.amount, 0) : 0;
                    const remainingBalance = user.balance - totalExpenses;

                    return (
                        <tr key={user.id}>
                            {/* <pre>{JSON.stringify(users, undefined, 2)}</pre> */}
                            <td>{user.name}</td>
                            <td className='amountData'>{formatter.format(user.balance)}</td>
                            <td className='amountData'>
                                {totalExpenses > 0
                                    ? formatter.format(totalExpenses)
                                    : "No expenses"}
                            </td>
                            <td className='amountData' style={{ color: remainingBalance < 0 ? 'red' : 'green' }}>
                                {formatter.format(remainingBalance)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AccountList;
