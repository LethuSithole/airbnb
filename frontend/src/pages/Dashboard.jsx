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
    <div className="container">
      <h1 className="page-title">My Hotel List</h1>

      <div className="button-group">
        <button className="btn" onClick={() => navigate('/reservations')}>
          View Reservations
        </button>
        <button className="btn" onClick={() => navigate('/listings/create')}>
          Create Listing
        </button>
        <button className="btn" onClick={() => navigate('/listings')}>
          View All Listings
        </button>
      </div>

      {listings.length === 0 ? (
        <p className="no-listings">No listings found.</p>
      ) : (
        listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            {/* Image */}
            <img
              src={listing.images?.[0] || '/placeholder.jpg'}
              alt={listing.title}
              className="listing-image"
            />

            {/* Info */}
            <div className="listing-info">
              <p className="listing-type">{listing.type} in {listing.location}</p>
              <h2 className="listing-title">{listing.title}</h2>

              <p className="listing-details">
                {listing.guests} guests · {listing.bedrooms} beds · {listing.bathrooms} bath
              </p>

              <p className="listing-amenities">
                {listing.amenities?.slice(0, 3).join(' · ')}
              </p>

              <div className="listing-meta">
                <span className="listing-rating">
                  <strong>{listing.rating.toFixed(1)}</strong> ⭐ ({listing.reviews} reviews)
                </span>
                <span className="listing-price"><strong>${listing.price}</strong> /night</span>
              </div>

              {/* Buttons */}
              <div className="listing-actions">
                <button
                  onClick={() => navigate(`/listings/edit/${listing._id}`)}
                  className="btn-update"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <style jsx>{`
        .container {
          padding: 1rem;
          width: 100%;
          margin: 0 auto;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }
        
        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: 1px solid #ddd;
          background: #f8f8f8;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        
        .btn:hover {
          background: #e8e8e8;
        }
        
        .no-listings {
          color: #666;
          font-size: 1rem;
        }
        
        .listing-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #ddd;
          padding-bottom: 2rem;
        }
        
        .listing-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .listing-info {
          flex: 1;
        }
        
        .listing-type {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }
        
        .listing-title {
          font-size: 1.3rem;
          margin: 0.3rem 0;
        }
        
        .listing-details {
          color: #444;
          margin: 0.5rem 0;
          font-size: 0.95rem;
        }
        
        .listing-amenities {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 0.5rem;
        }
        
        .listing-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }
        
        .listing-rating {
          font-size: 0.9rem;
        }
        
        .listing-price {
          font-size: 1.1rem;
        }
        
        .listing-actions {
          display: flex;
          gap: 0.8rem;
          margin-top: 1rem;
        }
        
        .btn-update {
          background-color: #3B82F6;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .btn-delete {
          background-color: #EF4444;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        @media (min-width: 768px) {
          .listing-card {
            flex-direction: row;
          }
          
          .listing-image {
            width: 250px;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;