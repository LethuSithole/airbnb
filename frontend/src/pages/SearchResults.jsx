import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const SearchResults = () => {
  const { location } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/accommodations');
        const filtered = res.data.filter(acc => acc.location.toLowerCase() === decodeURIComponent(location).toLowerCase());
        setResults(filtered);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch accommodations:', err);
        setLoading(false);
      }
    };
    fetchResults();
  }, [location]);

  if (loading) return <p>Loading results...</p>;

  return (
    <div className="container">
      <h1 className="page-title">Search Results for "{decodeURIComponent(location)}"</h1>
      {results.length === 0 ? (
        <p>No accommodations found for this location.</p>
      ) : (
        results.map(acc => (
          <div key={acc._id} className="listing-card">
            <img
              src={acc.images[0] || '/placeholder.jpg'}
              alt={acc.title}
              className="listing-image"
            />
            <div className="listing-info">
              <p className="listing-type">{acc.type} in {acc.location}</p>
              <h2 className="listing-title">{acc.title}</h2>
              <p className="listing-details">
                {acc.guests} guests · {acc.bedrooms} beds · {acc.bathrooms} bath
              </p>
              <p className="listing-amenities">
                {acc.amenities?.slice(0, 3).join(' · ')}
              </p>
              <div className="listing-meta">
                <span className="listing-rating">
                  <strong>{acc.rating.toFixed(1)}</strong> ⭐ ({acc.reviews} reviews)
                </span>
                <span className="listing-price">
                  <strong>${acc.price}</strong> /night
                </span>
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
          min-height: 50vh;
        }

        .page-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
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

export default SearchResults;
