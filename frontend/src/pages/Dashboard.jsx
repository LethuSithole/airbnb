import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const fetchListings = async () => {
    try {
      const res = await api.get('/accommodations/host');
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await api.delete(`/accommodations/${id}`);
      fetchListings();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>My Listings</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/listings/create')} style={{ marginRight: '1rem' }}>
          ➕ Create Listing
        </button>
        <button onClick={() => navigate('/listings')}>📄 View All Listings</button>
      </div>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id} style={{ marginBottom: '1rem' }}>
              <strong>{listing.title}</strong> — {listing.location} — ${listing.price}
              <div>
                <button onClick={() => navigate(`/listings/edit/${listing._id}`)} style={{ marginRight: '1rem' }}>
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(listing._id)}>🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
