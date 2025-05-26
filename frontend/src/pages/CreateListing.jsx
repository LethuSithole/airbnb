import { useState } from 'react';
import api from '../api/axios';

const CreateListing = () => {
  const [form, setForm] = useState({ title: '', location: '', price: 0 });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/accommodations', form);
      setMessage('Listing created!');
    } catch (err) {
      setMessage('Error creating listing');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create Listing</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateListing;
