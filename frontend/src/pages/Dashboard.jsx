import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  api.get('/accommodations/host')
    .then((res) => {
      console.log('Host listings response:', res.data);
      setListings(res.data);
    })
    .catch((err) => console.error(err));
}, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>My Listings</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/listings/create')} style={{ marginRight: '1rem' }}>
          ➕ Create Listing
        </button>
        <button onClick={() => navigate('/listings')} style={{ marginRight: '1rem' }}>
          📄 View All Listings
        </button>
        <button onClick={() => navigate('/reservations')}>
          📅 View Reservations
        </button>
      </div>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>
              <strong>{listing.title}</strong> — {listing.location} — ${listing.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
