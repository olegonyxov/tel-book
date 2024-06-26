import React from 'react';

function Form({ formData, setFormData, setIsEditing, users, setUsers }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const index = users.findIndex(user => user.id === formData.id);
    const updatedUsers = [...users];
    updatedUsers[index] = { ...formData };
    setUsers(updatedUsers);
    setFormData({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
    });
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
}

export default Form;