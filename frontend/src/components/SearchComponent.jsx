import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';
import api from '../api/axios';

const SearchComponent = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get('/accommodations');
        const uniqueLocations = [...new Set(res.data.map(acc => acc.location))];
        setLocations(uniqueLocations);
      } catch (err) {
        console.error('Failed to load locations:', err);
      }
    };
    fetchLocations();
  }, []);

  const handleSearch = () => {
    if (selectedLocation === 'all') {
      navigate('/locations');
    } else {
      navigate(`/locations/filter/${encodeURIComponent(selectedLocation)}`);
    }
  };

  return (
    <div className="search-container">
      <div className="search-filters">
        <div className="filter-group">
          <div className="filter-label">
            Location
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Location</option>
            <option value="all">All Locations</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <div className="filter-label">
            Check in
          </div>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="filter-input"
            placeholder="Add dates"
          />
        </div>

        <div className="filter-group">
          <div className="filter-label">
            Check out
          </div>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="filter-input"
            placeholder="Add dates"
          />
        </div>

        <div className="filter-group">
          <div className="filter-label">
            Guests
          </div>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="filter-input"
            placeholder="Add guests"
          />
        </div>

        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <style jsx>{`
        .search-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto 2rem;
          padding: 1rem;
          border-radius: 50%;
        }
        
        .search-filters {
          display: flex;
          gap: 1rem;
          background: white;
          border-radius: 999px;
          padding: 1rem 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          flex-wrap: wrap;
        }
        
        .filter-group {
          flex: 1;
          min-width: 200px;
          border-right: 1px solid #ddd;
          padding-right: 2rem;
        }
        
        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #555;
        }
        
        .filter-icon {
          color: #666;
        }
        
        .filter-select,
        .filter-input {
          width: 100%;
          padding: 0.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          background-color: white;
        }
        
        .search-button {
          background: #ff385c;
          color: white;
          border: none;
          border-radius: 999px;
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          height: 50px;
          align-self: flex-end;
          transition: background 0.2s;
        }
        
        .search-button:hover {
          background: #e61e4d;
        }
        
        @media (max-width: 768px) {
          .search-filters {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .search-button {
            width: 100%;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchComponent;