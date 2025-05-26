import { useEffect, useState } from 'react';
import api from '../api/axios';

const ViewListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get('/accommodations').then((res) => setListings(res.data));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id}>{listing.title} - ${listing.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewListings;
