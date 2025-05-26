import { useEffect, useState } from 'react';
import api from '../api/axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.get('/reservations/user').then((res) => setReservations(res.data));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Reservations</h2>
      <ul>
        {reservations.map((res) => (
          <li key={res._id}>
            {res.accommodation?.title || 'Listing'}: {res.startDate} to {res.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
