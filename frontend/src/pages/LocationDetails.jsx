import { useParams } from 'react-router-dom';

const LocationDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Location Details for ID: {id}</h2>
      <p>More details to be implemented...</p>
    </div>
  );
};
export default LocationDetails;
