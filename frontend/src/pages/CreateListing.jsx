import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    location: '',
    type: '',
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    weeklyDiscount: 0,
    cleaningFee: 0,
    serviceFee: 0,
    occupancyTaxes: 0,
    amenities: '',
    description: '',
  });

  const [images, setImages] = useState(['']);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => setImages([...images, '']);
  const removeImageField = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages.length > 0 ? newImages : ['']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amenities: form.amenities.split(',').map(a => a.trim()),
      images: images.filter(img => img.trim() !== ''),
    };

    try {
      await api.post('/accommodations', payload);
      setMessage('Listing created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch {
      setMessage('Failed to create listing');
    }
  };

  return (
    <div className="create-listing-container">
      <button className="btn" onClick={() => navigate("/dashboard")}>
        View All Listings
      </button>
      <h2 className="page-title">Create Listing</h2>
      
      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* First Row */}
          <div className="form-group">
            <label className="form-label">Listing Name</label>
            <input
              className="form-input"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Rooms</label>
            <input
              className="form-input"
              name="bedrooms"
              type="number"
              min="1"
              value={form.bedrooms}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Baths</label>
            <input
              className="form-input"
              name="bathrooms"
              type="number"
              min="1"
              value={form.bathrooms}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Type</label>
            <input
              className="form-input"
              name="type"
              type="text"
              value={form.type}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {/* Second Row */}
        <div className="form-group full-width">
          <label className="form-label">Location</label>
          <input
            className="form-input"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Third Row */}
        <div className="form-group full-width">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
        
        {/* Fourth Row */}
        <div className="form-group full-width">
          <label className="form-label">Amenities (comma separated)</label>
          <input
            className="form-input"
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            placeholder="wifi, kitchen, parking"
          />
        </div>
        
        {/* Fifth Row - Images */}
        <div className="form-group full-width">
          <label className="form-label">Images</label>
          {images.map((url, idx) => (
            <div key={idx} className="image-input-group">
              <input
                type="text"
                className="form-input"
                value={url}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                placeholder={`Image URL ${idx + 1}`}
              />
              <button 
                type="button" 
                className="remove-image-btn"
                onClick={() => removeImageField(idx)}
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            type="button" 
            className="add-image-btn"
            onClick={addImageField}
          >
            + Add Image
          </button>
        </div>
        
        {/* Preview Image */}
        {images[0] && (
          <div className="form-group full-width">
            <label className="form-label">Listed Image Preview</label>
            <div className="image-preview">
              <img src={images[0]} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        )}
        
        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">Create</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
        </div>
        
        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </form>

      <style jsx>{`
        .create-listing-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1.5rem;
        }
        
        .page-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .listing-form {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .full-width {
          grid-column: span 4;
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
          border-color: #3B82F6;
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
        
        .image-input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .remove-image-btn {
          background: #EF4444;
          color: white;
          border: none;
          padding: 0 1rem;
          border-radius: 4px;
          cursor: pointer;
          white-space: nowrap;
        }
        
        .add-image-btn {
          background: #E5E7EB;
          color: #333;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 0.5rem;
        }
        
        .image-preview {
          margin-top: 0.5rem;
        }
        
        .image-preview img {
          max-width: 100%;
          max-height: 200px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        
        .form-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
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
        
        .submit-btn {
          background-color: #3B82F6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .submit-btn:hover {
          background-color: #2563EB;
        }
        
        .cancel-btn {
          background-color: #E5E7EB;
          color: #333;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .cancel-btn:hover {
          background-color: #D1D5DB;
        }
        
        .message {
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 4px;
        }
        
        .success {
          background-color: #D1FAE5;
          color: #065F46;
        }
        
        .error {
          background-color: #FEE2E2;
          color: #B91C1C;
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .create-listing-container {
            padding: 1rem;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .submit-btn,
          .cancel-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateListing;