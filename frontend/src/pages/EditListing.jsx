import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get(`/accommodations`)
      .then((res) => {
        const listing = res.data.find((item) => item._id === id);
        if (listing) {
          setForm({
            title: listing.title || "",
            location: listing.location || "",
            type: listing.type || "",
            guests: listing.guests || 1,
            bedrooms: listing.bedrooms || 1,
            bathrooms: listing.bathrooms || 1,
            price: listing.price || 0,
            amenities: listing.amenities?.join(", ") || "",
            weeklyDiscount: listing.weeklyDiscount || 0,
            cleaningFee: listing.cleaningFee || 0,
            serviceFee: listing.serviceFee || 0,
            occupancyTaxes: listing.occupancyTaxes || 0,
            description: listing.description || "",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amenities: form.amenities.split(",").map((a) => a.trim()),
    };

    try {
      await api.put(`/accommodations/${id}`, payload);
      setMessage("Listing updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setMessage("Update failed. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="edit-container">
      <button className="btn" onClick={() => navigate("/dashboard")}>
        View All Listings
      </button>
      <h2 className="edit-title">Edit Listing</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {[
            ["Title", "title"],
            ["Location", "location"],
            ["Type", "type"],
            ["Guests", "guests", "number"],
            ["Bedrooms", "bedrooms", "number"],
            ["Bathrooms", "bathrooms", "number"],
            ["Price", "price", "number"],
            ["Weekly Discount", "weeklyDiscount", "number"],
            ["Cleaning Fee", "cleaningFee", "number"],
            ["Service Fee", "serviceFee", "number"],
            ["Occupancy Taxes", "occupancyTaxes", "number"],
          ].map(([label, name, type = "text"]) => (
            <div key={name} className="form-group">
              <label className="form-label">{label}</label>
              <input
                className="form-input"
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amenities (comma-separated)</label>
          <input
            className="form-input"
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            placeholder="wifi, kitchen, parking"
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Listing
        </button>

        {message && (
          <div
            className={`message ${
              message.includes("success") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}
      </form>

      <style>{`
        .edit-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: 1px solid #ddd;
          background: #f8f8f8;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
          margin: 10px 0;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
        }

        .edit-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .edit-form {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #444;
        }

        .form-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .form-textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          min-height: 100px;
          resize: vertical;
        }

        .submit-btn {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.2s;
        }

        .submit-btn:hover {
          background-color: #2563eb;
        }

        .message {
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 4px;
        }

        .success {
          background-color: #d1fae5;
          color: #065f46;
        }

        .error {
          background-color: #fee2e2;
          color: #b91c1c;
        }

        @media (max-width: 600px) {
          .edit-container {
            padding: 1rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default EditListing;
