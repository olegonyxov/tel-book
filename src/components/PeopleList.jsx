import React, { useState, useEffect } from 'react';

function PeopleList() {
  const [users, setUsers] = useState([]);
  const [newUser,setNewUser] = useState({})
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    username: '',
    phone: '',
  });

  function changeItem(id) {
    setIsEditing(true);
    const userToEdit = users.find(user => user.id === id);
    setFormData({
      id: userToEdit.id,
      name: userToEdit.name,
      username: userToEdit.username,
      phone: userToEdit.phone,
    });
  }

  function deleteItem(id) {
    let parsedData = JSON.parse(localStorage.getItem("users"));
    parsedData = parsedData.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(parsedData));
    setUsers(parsedData);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(user => {
      if (user.id === formData.id) {
        return {
          ...user,
          name: formData.name,
          username: formData.username,
          phone: formData.phone,
        };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setIsEditing(false); // Закрытие формы редактирования
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
          <button type="submit">Save</button>
        </form>
      ) : (
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
      )}
    </div>
  );
}

export default PeopleList;