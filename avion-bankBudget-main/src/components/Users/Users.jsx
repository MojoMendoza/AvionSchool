import './Users.css';
import { useState } from "react";
import '../../assets/users.json'

function AddUser(props){
    const { handleAddUser, newId } = props;
    const [user, setUser] = useState('');
    const [accountEmail, setEmail] = useState('');
    const [accountBalance, setBalance] = useState('');

    const addUserHandler = (event) => {
      event.preventDefault();

      const newUserObject = {
        id: newId,
        name: user,
        expenses:[],
        email: accountEmail,
        balance: accountBalance
      }

      handleAddUser(newUserObject);
      setUser('');
      setEmail('');
      setBalance('');
    }

    return (
      <div>
        <form onSubmit={addUserHandler} className="addUser">
          <input value={user} placeholder="Name" onChange={(event) => setUser(event.target.value)}></input>
          <input type="email" value={accountEmail} placeholder="Email" onChange={(event) => setEmail(event.target.value)}></input>
          <input type="number" value={accountBalance} placeholder="Account Balance" onChange={(event) => setBalance(parseInt(event.target.value))}></input>
          <button>Add User</button>
        </form>
      </div>
    );
}

export default AddUser;
