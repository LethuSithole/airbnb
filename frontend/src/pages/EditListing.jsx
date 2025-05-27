import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/accommodations`)
      .then((res) => {
        const listing = res.data.find(item => item._id === id);
        if (listing) {
          setForm({
            title: listing.title || '',
            location: listing.location || '',
            type: listing.type || '',
            guests: listing.guests || 1,
            bedrooms: listing.bedrooms || 1,
            bathrooms: listing.bathrooms || 1,
            price: listing.price || 0,
            amenities: listing.amenities?.join(', ') || '',
            weeklyDiscount: listing.weeklyDiscount || 0,
            cleaningFee: listing.cleaningFee || 0,
            serviceFee: listing.serviceFee || 0,
            occupancyTaxes: listing.occupancyTaxes || 0,
            description: listing.description || '',
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
      await api.put(`/accommodations/${id}`, payload);
      setMessage('Listing updated!');
      setTimeout(() => navigate('/'), 1000);
    } catch {
      setMessage('Update failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Edit Listing</h2>
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
        <button type="submit">Update</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default EditListing;
