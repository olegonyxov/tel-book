import React, { useState, useEffect } from 'react';

function PeopleList() {
  const [users, setUsers] = useState([]);

  function changeItem(id) {
    let parsedData = JSON.parse(localStorage.getItem("users"));
    parsedData = parsedData.filter(user => user.id !== id);
    
    localStorage.setItem("users", JSON.stringify(parsedData));
    setUsers(parsedData); 
    console.log("vanished id " + id);

    console.log("button edit " + id);
  }

  function deleteItem(id) {
    let parsedData = JSON.parse(localStorage.getItem("users"));
    parsedData = parsedData.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(parsedData));
    setUsers(parsedData); 
    console.log("vanished id " + id);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      localStorage.setItem("users", JSON.stringify(data));
      setUsers(data); 
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  return (
    <div>
      <div className="PeopleList">
        <ul className="userList">
          {users.map(user => (
            <li className="listItem" key={user.id}>
              <span>{user.name}</span>
              <span>{user.username}</span>
              <span>{user.phone}</span>
              <input type="button" value="Edit" onClick={() => changeItem(user.id)}></input>
              <input type="button" value="Delete" onClick={() => deleteItem(user.id)}></input>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PeopleList;