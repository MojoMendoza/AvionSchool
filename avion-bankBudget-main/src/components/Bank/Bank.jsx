import "./Bank.css";
import { useState } from "react";
import data from "../../assets/users.json";
import AddUser from "../Users/Users";
import Budget from "../Budget/Budget";

function Bank() {
  const [users, setUsers] = useState(data);
  const [expenses, setExpenses] = useState([]);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [amount2, setAmount2] = useState("");
  const [count, setCount] = useState(users.length);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [activeTab, setActive] = useState(true);
  const [activeTab2, setActive2] = useState(false);

  const userExist = (name) => {
    return users.find((user) => user.name === name);
  };

  const findUser = (name) => {
    let foundUser = users.filter((user) => user.name === name);
    return foundUser[0];
  };

  // Calculate available balance (balance - total expenses)
  const getAvailableBalance = (user) => {
    const totalExpenses = user.expenses ? user.expenses.reduce((total, expense) => total + expense.amount, 0) : 0;
    return user.balance - totalExpenses;
  };

  const transferMoney = (e) => {
    const newAmount = Number(amount);
    if (userExist(sender) && userExist(receiver) && sender !== receiver && newAmount > 0) {
      const senderInfo = findUser(sender);
      const receiverInfo = findUser(receiver);
      const senderAvailableBalance = getAvailableBalance(senderInfo);

      if (senderAvailableBalance >= newAmount) {
        const updateUsers = users.map((user) => {
          if (user.name === sender) {
            return {
              ...user,
              balance: user.balance - newAmount,
            };
          } else if (user.name === receiver) {
            return {
              ...user,
              balance: user.balance + newAmount,
            };
          }
          return user;
        });
        setUsers(updateUsers);
      } else {
        alert("Not enough available balance to transfer.");
      }
    } else {
      alert("Transaction invalid");
    }

    setSender("");
    setReceiver("");
    setAmount("");
    e.preventDefault();
  };

  const withdrawMoney = (e) => {
    const newAmount = Number(amount);
    if (userExist(sender) && newAmount > 0) {
      const senderInfo = findUser(sender);
      const senderAvailableBalance = getAvailableBalance(senderInfo);

      if (senderAvailableBalance >= newAmount) {
        const updateUsers = users.map((user) => {
          if (user.name === sender) {
            return {
              ...user,
              balance: user.balance - newAmount,
            };
          }
          return user;
        });
        setUsers(updateUsers);
      } else {
        alert("Not enough available balance to withdraw.");
      }
    } else {
      alert("Transaction invalid");
    }

    setSender("");
    setAmount("");
    e.preventDefault();
  };

  const depositMoney = (e) => {
    const newAmount2 = Number(amount2);
    if (userExist(receiver) && newAmount2 > 0) {
      const receiverInfo = findUser(receiver);
      const updateUsers = users.map((user) => {
        if (user.name === receiver) {
          return {
            ...user,
            balance: user.balance + newAmount2,
          };
        }
        return user;
      });
      setUsers(updateUsers);
    } else {
      alert("Transaction invalid");
    }

    setReceiver("");
    setAmount2("");
    e.preventDefault();
  };

  const handleUsers = (newUser) => {
    let newCount = count + 1;
    setCount(newCount);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleWithdrawShow = () => {
    setShow(true);
    setActive(true);
    setShow2(false);
    setActive2(false);
  };

  const handleTransferShow = () => {
    setShow2(true);
    setActive2(true);
    setShow(false);
    setActive(false);
  };

  return (
    <div className="Bank">
      <div className="functionForms">
        <div className="tabs">
          <span
            id="tab-1"
            className={activeTab ? "active-tab" : null}
            onClick={handleWithdrawShow}
          >
            Withdraw/Deposit
          </span>
          <span
            id="tab-2"
            className={activeTab2 ? "active-tab" : null}
            onClick={handleTransferShow}
          >
            Transfer
          </span>
        </div>
        <div className="tab-content">
          {show && (
            <div id="withdraw-deposit">
              <form className="withdraw" onSubmit={withdrawMoney}>
                <label>Withdraw: </label>
                <select
                  value={sender}
                  onChange={(event) => setSender(event.target.value)}
                  required
                >
                  <option selected>--</option>
                  {users.map(({ key, name }) => (
                    <option key={key} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <label>Amount: </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  required
                />
                <button>Confirm Withdraw</button>
              </form>
              <form className="deposit" onSubmit={depositMoney}>
                <label>Deposit: </label>
                <select
                  value={receiver}
                  onChange={(event) => setReceiver(event.target.value)}
                  required
                >
                  <option selected>--</option>
                  {users.map(({ key, name }) => (
                    <option key={key} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <label>Amount: </label>
                <input
                  type="number"
                  value={amount2}
                  onChange={(event) => setAmount2(event.target.value)}
                  required
                />
                <button>Confirm Deposit</button>
              </form>
            </div>
          )}

          {show2 && (
            <div id="transfer">
              <form className="transferForm" onSubmit={transferMoney}>
                <label>Sender: </label>
                <select
                  value={sender}
                  onChange={(event) => setSender(event.target.value)}
                  required
                >
                  <option selected>--</option>
                  {users.map(({ key, name }) => (
                    <option key={key} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <br />
                <label>Receiver: </label>
                <select
                  value={receiver}
                  onChange={(event) => setReceiver(event.target.value)}
                  required
                >
                  <option selected>--</option>
                  {users.map(({ key, name }) => (
                    <option key={key} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <br />
                <label>Amount: </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  required
                />
                <br />
                <button>Confirm Transfer</button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div id="accountList">
        <div className="listItem">
          <h5>Account Name</h5>
          {users.map((user) => {
            return <div key={user.id}>{user.name}</div>;
          })}
        </div>
        <div className="listItem">
          <h5>Account Balance</h5>
          {users.map((user) => {
            const totalExpenses = user.expenses ? user.expenses.reduce((total, expense) => total + expense.amount, 0) : 0;
            const remainingBalance = user.balance - totalExpenses;
            return (
              <div key={user.id}>
                {"$" + " " + remainingBalance.toLocaleString()}
              </div>
            );
          })}
        </div>
        <div className="listItem">
          <h5>E-mail</h5>
          {users.map((user) => {
            return <div key={user.id}>{user.email}</div>;
          })}
        </div>
        <div className="listItem">
          <h5>Account #</h5>
          {users.map((user) => {
            return <div key={user.id}>{user.id}</div>;
          })}
        </div>
      </div>

      <div className="listContainer">
        <div className="userList">
          {users.map((user) => {
            return (
              <div key={user.id} className="userItem">
                <span>{user.name}</span>
                <button onClick={() => handleDeleteUser(user.id)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            );
          })}
        </div>

        <AddUser handleAddUser={handleUsers} newId={count} />
      </div>

      <Budget users={users} expenses={expenses} setExpenses={setExpenses} setUsers={setUsers} />

    </div>
  );
}

export default Bank;
