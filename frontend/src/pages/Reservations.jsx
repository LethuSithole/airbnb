import { useEffect, useState } from "react";
import api from "../api/axios";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    setLoading(true);
    api
      .get("/reservations/user")
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reservations", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    setDeletingId(id);
    try {
      await api.delete(`/reservations/${id}`);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete reservation.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="loading">Loading reservations...</div>;

  return (
    <div className="reservations-container">
      <h2 className="page-title">My Reservations</h2>
      
      {reservations.length === 0 ? (
        <p className="no-reservations">No reservations found.</p>
      ) : (
        <div className="table-container">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Booked by</th>
                <th>Property</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id}>
                  <td>{res.user?.name || "Guest"}</td>
                  <td>{res.accommodation?.title || "Untitled Listing"}</td>
                  <td>{new Date(res.startDate).toLocaleDateString()}</td>
                  <td>{new Date(res.endDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(res._id)}
                      disabled={deletingId === res._id}
                      className="delete-btn"
                    >
                      {deletingId === res._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .reservations-container {
          width: 90%;
          margin: 0 auto;
          padding: 1.5rem;
        }
        
        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
          color: #666;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .no-reservations {
          color: #666;
          font-size: 1rem;
          padding: 1rem;
          background: #f8f8f8;
          border-radius: 4px;
        }
        
        .table-container {
          overflow-x: auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        
        .reservations-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }
        
        .reservations-table th,
        .reservations-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .reservations-table th {
          background: #f5f5f5;
          font-weight: 500;
          color: #444;
        }
        
        .reservations-table tr:hover {
          background: #f9f9f9;
        }
        
        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
          width: 100%;
        }
        
        .delete-btn:hover:not(:disabled) {
          background: #dc2626;
        }
        
        .delete-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .reservations-container {
            padding: 1rem;
          }
          
          .reservations-table th,
          .reservations-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.9rem;
          }
          
          .delete-btn {
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Reservations;