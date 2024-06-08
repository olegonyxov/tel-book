import React, { useState, useEffect } from 'react';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDel from '../components/ButtonDel';
function PeopleList() {
  const [users, setUsers] = useState([]);

useEffect (()=> {
  const fetchUsers = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json();
    setUsers(data);
  }
  fetchUsers();
},[]);


  return (
    <div>
      <div className="PeopleList">
        <ul className="userList">
          {users.map(user => (
            <li className = "listItem"  key = {user.id}> <span>{user.name}</span> <span>{user.username}</span> <span>{user.phone}</span> <ButtonEdit id = {user.id}/>   <ButtonDel id = {user.id}/> </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default PeopleList;