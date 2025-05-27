import { useEffect, useState } from 'react';
import api from '../api/axios';

const ViewListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/accommodations')
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading listings...</p>
    </div>
  );

  return (
    <div className="listings-container">
      <h2 className="page-title">All Listings</h2>
      
      {listings.length === 0 ? (
        <div className="empty-state">
          <p>No listings found</p>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <div className="listing-image-container">
                <img 
                  src={listing.images?.[0] || '/placeholder-image.jpg'} 
                  alt={listing.title}
                  className="listing-image"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="listing-content">
                <div className="listing-header">
                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-price">${listing.price}<span className="price-unit">/night</span></p>
                </div>
                <p className="listing-location">
                  <svg className="location-icon" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {listing.location}
                </p>
                <div className="listing-details">
                  <span>{listing.guests} guests</span>
                  <span>{listing.bedrooms} bedrooms</span>
                  <span>{listing.bathrooms} baths</span>
                </div>
                {listing.amenities?.length > 0 && (
                  <div className="listing-amenities">
                    {listing.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .listings-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          gap: 1rem;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3B82F6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .empty-state {
          text-align: center;
          padding: 2rem;
          background: #f8f8f8;
          border-radius: 8px;
          color: #666;
        }
        
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .listing-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .listing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .listing-image-container {
          height: 200px;
          overflow: hidden;
        }
        
        .listing-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .listing-card:hover .listing-image {
          transform: scale(1.05);
        }
        
        .listing-content {
          padding: 1.25rem;
        }
        
        .listing-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .listing-title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }
        
        .listing-price {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #3B82F6;
        }
        
        .price-unit {
          font-size: 0.8rem;
          color: #666;
          font-weight: normal;
        }
        
        .listing-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin: 0 0 0.75rem 0;
          font-size: 0.9rem;
          color: #666;
        }
        
        .location-icon {
          width: 14px;
          height: 14px;
          fill: #666;
        }
        
        .listing-details {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          color: #555;
        }
        
        .listing-amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        
        .amenity-tag {
          background: #f0f5ff;
          color: #3B82F6;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
          .listings-container {
            padding: 1rem;
          }
          
          .listings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewListings;