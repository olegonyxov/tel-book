import React, { useState, useEffect } from 'react';

function PeopleList() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    username: '',
    phone: '',
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      const fetchUsers = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        localStorage.setItem("users", JSON.stringify(data));
        setUsers(data);
      };
      fetchUsers();
    }
  }, []);

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
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.filter(user => user.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
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
      return updatedUsers;
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={()=>setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="PeopleList">
          <ul className="userList">
            {users.map(user => (
              <li className="listItem" key={user.id}>
                <span>{user.name}</span>
                <span>{user.username}</span>
                <span>{user.phone}</span>
                <input type="button" value="Edit" onClick={() => changeItem(user.id)} />
                <input type="button" value="Delete" onClick={() => deleteItem(user.id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PeopleList;