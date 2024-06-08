import React, { useState, useEffect } from 'react';

function PeopleList() {
  const [users, setUsers] = useState([]);

useEffect (()=> {
  const fetchUsers = async() =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json();
    setUsers(data);
  }

  fetchUsers();
  console.log(users)
  console.log("hi")
},[]);


  return (
    <div>
      <p>PeopleList</p>
      <div className="PeopleList">
        <ul className="userList">
          {users.map(user => (
            <li key = {user.id}>{user.name}---{user.username}---{user.phone}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default PeopleList;