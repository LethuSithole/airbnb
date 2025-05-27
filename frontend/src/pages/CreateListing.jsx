import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    location: '',
    type: '',
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    weeklyDiscount: 0,
    cleaningFee: 0,
    serviceFee: 0,
    occupancyTaxes: 0,
    amenities: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amenities: form.amenities.split(',').map(a => a.trim()),
    };

    try {
      await api.post('/accommodations', payload);
      setMessage('Listing created!');
      setTimeout(() => navigate('/'), 1000);
    } catch {
      setMessage('Failed to create listing');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create Listing</h2>
      <form onSubmit={handleSubmit}>
        {[
          ['Title', 'title'],
          ['Location', 'location'],
          ['Type', 'type'],
          ['Guests', 'guests', 'number'],
          ['Bedrooms', 'bedrooms', 'number'],
          ['Bathrooms', 'bathrooms', 'number'],
          ['Price', 'price', 'number'],
          ['Weekly Discount', 'weeklyDiscount', 'number'],
          ['Cleaning Fee', 'cleaningFee', 'number'],
          ['Service Fee', 'serviceFee', 'number'],
          ['Occupancy Taxes', 'occupancyTaxes', 'number'],
        ].map(([label, name, type = 'text']) => (
          <div key={name} style={{ marginBottom: '0.5rem' }}>
            <label>{label}</label><br />
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Description</label><br />
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Amenities (comma-separated)</label><br />
          <input
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            placeholder="wifi, kitchen, parking"
          />
        </div>
        <button type="submit">Create</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CreateListing;
