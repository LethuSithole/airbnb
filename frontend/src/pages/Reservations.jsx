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

  if (loading) return <p>Loading reservations...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res._id} style={{ marginBottom: "1rem" }}>
              <strong>
                {res.accommodation?.title || "Untitled Listing"}
              </strong>
              <br />
              Location: {res.accommodation?.location || "Unknown"}
              <br />
              Guests: {res.guests}
              <br />
              Dates: {new Date(res.startDate).toLocaleDateString()} to{" "}
              {new Date(res.endDate).toLocaleDateString()}
              <br />
              <button
                onClick={() => handleDelete(res._id)}
                disabled={deletingId === res._id}
                style={{ marginTop: "0.5rem", color: "white", background: "red", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                {deletingId === res._id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reservations;
