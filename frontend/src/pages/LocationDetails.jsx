import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaStar,
  FaMedal,
  FaHome,
  FaSoap,
  FaKey,
  FaSyncAlt,
  FaCamera,
  FaCheck,
  FaUserShield,
  FaSmokingBan,
  FaDog,
  FaBan,
  FaUserFriends,
  FaBed,
  FaBath,
  FaCalendarAlt,
  FaRegCalendarAlt,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";

const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/accommodations/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Failed to load listing:", err);
        toast.error("Failed to load listing details");
      }
    };
    fetchListing();
  }, [id]);

  const handleReservation = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }
    if (startDate > endDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    setIsReserving(true);
    try {
      const res = await api.post("/reservations", {
        accommodation: listing._id,
        host: listing.host_id,
        startDate,
        endDate,
        guests: Number(guests),
      });

      toast.success(
        <div>
          <h3>Reservation confirmed!</h3>
          <p>
            Your stay at {listing.title} is booked from{" "}
            {startDate.toDateString()} to {endDate.toDateString()}
          </p>
          <p>Total: ${total}</p>
          <button
            onClick={() => navigate("/reservations")}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              background: "#fff",
              color: "#FF385C",
              border: "1px solid #FF385C",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            View My Trips
          </button>
        </div>,
        { autoClose: false }
      );
      setStartDate(new Date());
      setEndDate(new Date());
      setGuests(1);
    } catch (err) {
      console.error("Reservation failed:", err);
      toast.error(err.response?.data?.message || "Failed to make reservation");
    } finally {
      setIsReserving(false);
    }
  };

  if (!listing) return <div className="loading">Loading...</div>;

  const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const basePrice = listing.price * nights;
  const discount = listing.weeklyDiscount
    ? (basePrice * listing.weeklyDiscount) / 100
    : 0;
  const cleaningFee = listing.cleaningFee || 40;
  const serviceFee = listing.serviceFee || 35;
  const taxes = listing.occupancyTaxes || 20;
  const total = basePrice - discount + cleaningFee + serviceFee + taxes;

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sampleReviews = [
    {
      name: "Alex",
      date: "May 2024",
      content:
        "Great location and the apartment was exactly as described. Would definitely stay again!",
    },
    {
      name: "Sarah",
      date: "April 2024",
      content:
        "The host was very responsive and the place was spotless. Perfect for our weekend getaway.",
    },
    {
      name: "Michael",
      date: "March 2024",
      content:
        "Amazing views of the city skyline. The apartment had everything we needed for a comfortable stay.",
    },
  ];

  // Icon mapping for amenities (add more as needed)
  const amenityIcons = {
    "Garden view": <FaHome />,
    Kitchen: <FaCheck />,
    WiFi: <FaCheck />,
    "Pets allowed": <FaDog />,
    "Free washer - in building": <FaCheck />,
    Dryer: <FaCheck />,
    "Central air conditioning": <FaCheck />,
    "Security cameras on property": <FaShieldAlt />,
    Refrigerator: <FaCheck />,
    Bicycles: <FaCheck />,
  };

  return (
    <div className="listing-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="listing-header">
        <h1 className="listing-title">
          {listing.title || "Beautiful Rental Property"}
        </h1>
        <div className="rating-container">
          <span className="rating-star">
            <FaStar />
          </span>
          <span className="rating-value">{listing.rating || "4.8"}</span>
          <span className="rating-divider">·</span>
          <span className="review-count">
            {listing.reviews || "124"} reviews
          </span>
          <span className="rating-divider">·</span>
          <span className="superhost-badge">
            <FaMedal /> Superhost
          </span>
          <span className="rating-divider">·</span>
          <span className="location">{listing.location || "New York"}</span>
        </div>
      </div>

      <div className="image-gallery">
        <div className="main-image">
          <img
            src={listing.images?.[0] || "https://via.placeholder.com/800x500"}
            alt="Main"
          />
        </div>
        <div className="secondary-images">
          {(
            listing.images?.slice(1, 5) ||
            Array(4).fill("https://via.placeholder.com/400x300")
          ).map((img, index) => (
            <div key={index} className="secondary-image">
              <img src={img} alt={`Gallery ${index + 1}`} />
              {index === 3 && (
                <button className="show-all-photos">
                  <FaCamera /> Show all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="content-container">
        <div className="left-column">
          <div className="host-section">
            <h2 className="section-title">
              Entire rental unit hosted by {listing.host || "Ghazal"}
            </h2>
            <div className="host-details">
              <span>
                <FaUserFriends /> {listing.guests || "4"} guests
              </span>
              <span>·</span>
              <span>
                <FaBed /> {listing.bedrooms || "2"} bedroom
              </span>
              <span>·</span>
              <span>
                <FaBed /> {listing.beds || "1"} bed
              </span>
              <span>·</span>
              <span>
                <FaBath /> {listing.bathrooms || "1"} bath
              </span>
            </div>
          </div>

          <div className="features-section">
            <div className="feature-item">
              <div className="feature-icon">
                <FaHome />
              </div>
              <div className="feature-text">
                <strong>Entire home</strong>
                <p>You'll have the apartment to yourself</p>
              </div>
            </div>
            {listing.enhancedCleaning && (
              <div className="feature-item">
                <div className="feature-icon">
                  <FaSoap />
                </div>
                <div className="feature-text">
                  <strong>Enhanced Clean</strong>
                  <p>
                    This host committed to Airbnb's enhanced cleaning process.{" "}
                    <a href="#">Show more</a>
                  </p>
                </div>
              </div>
            )}
            {listing.selfCheckIn && (
              <div className="feature-item">
                <div className="feature-icon">
                  <FaKey />
                </div>
                <div className="feature-text">
                  <strong>Self check-in</strong>
                  <p>Check yourself in with the keypad.</p>
                </div>
              </div>
            )}
            <div className="feature-item">
              <div className="feature-icon">
                <FaSyncAlt />
              </div>
              <div className="feature-text">
                <strong>
                  Free cancellation before{" "}
                  {new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </strong>
              </div>
            </div>
          </div>

          <div className="description-section">
            <p>
              {listing.description ||
                "Experience the heart of the city in this modern downtown apartment with all the amenities you need for a comfortable stay."}
            </p>
            <button className="show-more">Show more</button>
          </div>

          <div className="sleep-section">
            <h2 className="section-title">Where you'll sleep</h2>
            <div className="sleep-content">
              <div className="sleep-image">
                <img
                  src={
                    listing.images?.[1] || "https://via.placeholder.com/400x300"
                  }
                  alt="Sleeping area"
                />
              </div>
              <div className="sleep-details">
                <h3>
                  <FaBed /> Bedroom
                </h3>
                <p>
                  {listing.beds || "1"} {listing.beds === 1 ? "bed" : "beds"}
                </p>
              </div>
            </div>
          </div>

          <div className="amenities-section">
            <h2 className="section-title">What this place offers</h2>
            <div className="amenities-grid">
              {(
                listing.amenities || [
                  "Garden view",
                  "Kitchen",
                  "WiFi",
                  "Pets allowed",
                  "Free washer - in building",
                  "Dryer",
                  "Central air conditioning",
                  "Security cameras on property",
                  "Refrigerator",
                  "Bicycles",
                ]
              )
                .slice(0, showAllAmenities ? listing.amenities?.length : 6)
                .map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <span className="amenity-checkbox">
                      {amenityIcons[amenity] || <FaCheck />}
                    </span>
                    <span>{amenity}</span>
                  </div>
                ))}
            </div>

            <div className="amenities-date-pickers">
              <h3 className="dates-title">
                {nights} nights in {listing.location || "New York"}
              </h3>
              <p className="dates-range">
                {formatDate(startDate)} - {formatDate(endDate)}
              </p>

              <div className="date-pickers-container">
                <div className="date-picker-column">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    inline
                  />
                </div>
                <div className="date-picker-column">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    inline
                  />
                </div>
              </div>

              <button
                className="clear-dates-button"
                onClick={() => {
                  setStartDate(new Date());
                  setEndDate(new Date());
                }}
              >
                Clear dates
              </button>
            </div>

            <button
              className="show-more"
              onClick={() => setShowAllAmenities(!showAllAmenities)}
            >
              {showAllAmenities
                ? "Show less"
                : `Show all ${listing.amenities?.length || 37} amenities`}
            </button>
          </div>

          <div className="reviews-section">
            <h2 className="section-title">
              <span className="rating-star">
                <FaStar />
              </span>{" "}
              {listing.rating || "4.8"} · {listing.reviews || "124"} reviews
            </h2>
            <div className="review-categories">
              <div className="review-category">
                <span>Cleanliness</span>
                <span className="rating-value">
                  {listing.specificRatings?.cleanliness || "4.9"}
                </span>
              </div>
              <div className="review-category">
                <span>Communication</span>
                <span className="rating-value">
                  {listing.specificRatings?.communication || "4.8"}
                </span>
              </div>
              <div className="review-category">
                <span>Check-in</span>
                <span className="rating-value">
                  {listing.specificRatings?.checkIn || "4.9"}
                </span>
              </div>
              <div className="review-category">
                <span>Accuracy</span>
                <span className="rating-value">
                  {listing.specificRatings?.accuracy || "4.7"}
                </span>
              </div>
              <div className="review-category">
                <span>Location</span>
                <span className="rating-value">
                  {listing.specificRatings?.location || "4.9"}
                </span>
              </div>
              <div className="review-category">
                <span>Value</span>
                <span className="rating-value">
                  {listing.specificRatings?.value || "4.6"}
                </span>
              </div>
            </div>

            <div className="review-list">
              {sampleReviews
                .slice(0, showAllReviews ? sampleReviews.length : 3)
                .map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="reviewer-info">
                      <div className="reviewer-name">
                        <FaUser /> {review.name}
                      </div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div className="review-content">{review.content}</div>
                  </div>
                ))}
            </div>
            <button
              className="show-more"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews
                ? "Show less"
                : `Show all ${listing.reviews || "124"} reviews`}
            </button>
          </div>

          <div className="host-profile">
            <h2 className="section-title">
              Hosted by {listing.host || "Ghazal"}
            </h2>
            <div className="host-details">
              <span>
                <FaRegCalendarAlt /> Joined May 2021
              </span>
              <span>
                <FaStar /> {listing.reviews || "124"} Reviews
              </span>
              <span>
                <FaUserShield /> Identity verified
              </span>
              <span>
                <FaMedal /> Superhost
              </span>
            </div>
            <p className="host-description">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </p>
            <div className="host-stats">
              <div>
                <strong>Response rate:</strong> 100%
              </div>
              <div>
                <strong>Response time:</strong> within an hour
              </div>
            </div>
            <button className="contact-host">Contact Host</button>
            <p className="safety-notice">
              To protect your payment, never transfer money or communicate
              outside of the Airbnb website or app.
            </p>
          </div>

          <div className="things-to-know">
            <h2 className="section-title">Things to know</h2>
            <div className="rules-grid">
              <div className="rules-column">
                <h3>House rules</h3>
                <ul>
                  <li>
                    <FaCalendarAlt /> Check-in: After 4:00 PM
                  </li>
                  <li>
                    <FaCalendarAlt /> Checkout: 10:00 AM
                  </li>
                  {listing.selfCheckIn && (
                    <li>
                      <FaKey /> Self check-in with lockbox
                    </li>
                  )}
                  <li>
                    <FaBan /> Not suitable for infants (under 2 years)
                  </li>
                  <li>
                    <FaSmokingBan /> No smoking
                  </li>
                  <li>
                    <FaDog /> No pets
                  </li>
                  <li>
                    <FaBan /> No parties or events
                  </li>
                </ul>
              </div>
              <div className="rules-column">
                <h3>Health & safety</h3>
                <ul>
                  {listing.enhancedCleaning && (
                    <li>
                      <FaSoap /> Committed to Airbnb's enhanced cleaning process
                    </li>
                  )}
                  <li>
                    <FaUserShield /> Airbnb's social-distancing guidelines apply
                  </li>
                  <li>
                    <FaShieldAlt /> Carbon monoxide alarm
                  </li>
                  <li>
                    <FaShieldAlt /> Smoke alarm
                  </li>
                  <li>
                    <FaShieldAlt /> Security Deposit - if you damage the home,
                    you may be charged up to $566
                  </li>
                </ul>
                <button className="show-more">Show more</button>
              </div>
              <div className="rules-column">
                <h3>Cancellation policy</h3>
                <p>
                  <FaSyncAlt /> Free cancellation before{" "}
                  {new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <button className="show-more">Show more</button>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="booking-widget">
            <div className="price-section">
              <span className="price">${listing.price || "220"}</span>
              <span className="price-unit"> / night</span>
              <div className="rating">
                <span className="rating-star">
                  <FaStar />
                </span>
                <span className="rating-value">{listing.rating || "4.8"}</span>
                <span className="review-count">
                  · {listing.reviews || "124"} reviews
                </span>
              </div>
            </div>

            <div className="date-selector">
              <div className="date-input">
                <label>CHECK-IN</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Add date"
                />
              </div>
              <div className="date-input">
                <label>CHECKOUT</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Add date"
                />
              </div>
            </div>

            <div className="guests-selector">
              <label>GUESTS</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {Array.from(
                  { length: listing.guests || 4 },
                  (_, i) => i + 1
                ).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="reserve-button"
              onClick={handleReservation}
              disabled={isReserving}
            >
              {isReserving ? (
                <>
                  <span className="spinner"></span> Processing...
                </>
              ) : (
                "Reserve"
              )}
            </button>

            <div className="price-breakdown">
              <div className="price-line">
                <span>
                  ${listing.price || "220"} × {nights} nights
                </span>
                <span>${basePrice}</span>
              </div>
              {listing.weeklyDiscount && (
                <div className="price-line">
                  <span>Weekly discount</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="price-line">
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="price-line">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className="price-line">
                <span>Occupancy taxes and fees</span>
                <span>${taxes}</span>
              </div>
              <div className="price-total">
                <strong>Total</strong>
                <strong>${total}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .listing-container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 80px;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
        }

        .listing-header {
          margin-bottom: 1.5rem;
        }

        .listing-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .rating-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: #333;
        }

        .rating-star {
          color: #ff385c;
        }

        .rating-divider {
          opacity: 0.5;
        }

        .superhost-badge {
          color: #ff385c;
        }

        .image-gallery {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 8px;
          height: 500px;
          margin-bottom: 2rem;
        }

        .main-image {
          border-radius: 12px;
          overflow: hidden;
          grid-row: span 1;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .secondary-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .secondary-image {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .secondary-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .show-all-photos {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          padding: 0.5rem 1rem;
          background: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .content-container {
          display: flex;
          gap: 40px;
          margin-top: 32px;
        }

        .left-column {
          flex: 1;
          min-width: 0;
        }

        .right-column {
          width: 400px;
          position: sticky;
          top: 20px;
          height: fit-content;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2.5rem 0 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #ddd;
        }

        .host-section {
          margin-bottom: 2rem;
        }

        .host-details {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          color: #555;
          margin-bottom: 1rem;
        }

        .features-section {
          margin: 1.5rem 0;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .feature-icon {
          font-size: 1.5rem;
        }

        .feature-text {
          flex: 1;
        }

        .feature-text a {
          color: #333;
          text-decoration: underline;
        }

        .description-section {
          margin: 1.5rem 0;
        }

        /* Sleep Section */
        .sleep-section {
          margin: 2.5rem 0;
          padding-bottom: 2rem;
          border-bottom: 1px solid #ddd;
        }

        .sleep-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .sleep-image {
          width: 300px;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
        }

        .sleep-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sleep-details {
          flex: 1;
        }

        .sleep-details h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .sleep-details p {
          color: #555;
        }

        @media (max-width: 768px) {
          .sleep-content {
            flex-direction: column;
          }

          .sleep-image {
            width: 100%;
            height: 250px;
          }
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1rem 0;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .amenity-checkbox {
          width: 20px;
          height: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Amenities Date Pickers */
        .amenities-date-pickers {
          margin: 2rem 0;
          padding: 1.5rem;
          border: 1px solid #ddd;
          border-radius: 12px;
        }

        .dates-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .dates-range {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .date-pickers-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .date-picker-column {
          flex: 1;
        }

        .clear-dates-button {
          background: none;
          border: none;
          color: #333;
          text-decoration: underline;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
        }

        /* Adjust the react-datepicker styles */
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: none;
        }

        .react-datepicker__header {
          background-color: white;
          border-bottom: 1px solid #ddd;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--in-selecting-range,
        .react-datepicker__day--in-range {
          background-color: #ff385c;
          color: white;
        }

        .react-datepicker__day--keyboard-selected {
          background-color: rgba(255, 56, 92, 0.2);
          color: inherit;
        }

        .review-categories {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1rem 0;
        }

        .review-category {
          display: flex;
          justify-content: space-between;
        }

        .review-list {
          margin: 1.5rem 0;
        }

        .review-item {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .reviewer-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .reviewer-name {
          font-weight: 600;
        }

        .review-date {
          color: #666;
        }

        .host-profile {
          margin: 2rem 0;
          padding: 1.5rem 0;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }

        .host-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0.5rem 0;
        }

        .host-stats {
          margin: 1rem 0;
        }

        .contact-host {
          width: auto;
          padding: 0.75rem;
          background: white;
          border: 1px solid #333;
          border-radius: 8px;
          font-weight: 500;
          margin: 1rem 0;
          cursor: pointer;
        }

        .safety-notice {
          font-size: 0.85rem;
          color: #666;
        }

        .rules-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        .rules-column h3 {
          margin-bottom: 1rem;
        }

        .rules-column ul {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0;
        }

        .rules-column li {
          margin-bottom: 0.5rem;
        }

        .booking-widget {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .price-section {
          display: flex;
          align-items: baseline;
          margin-bottom: 1rem;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .price-unit {
          color: #666;
        }

        .rating {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .date-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .date-input {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 0.5rem;
        }

        .date-input label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .guests-selector {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 0.5rem;
          margin: 1rem 0;
        }

        .guests-selector label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .guests-selector select {
          width: 100%;
          border: none;
          outline: none;
          font-size: 1rem;
        }

        .reserve-button {
          width: 100%;
          padding: 0.75rem;
          background: #ff385c;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          margin: 1rem 0;
          cursor: pointer;
        }

        .price-breakdown {
          margin-top: 1rem;
          border-top: 1px solid #ddd;
          padding-top: 1rem;
        }

        .price-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .price-total {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #ddd;
          font-size: 1.1rem;
        }

        .show-more {
          background: none;
          border: none;
          color: #333;
          text-decoration: underline;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          margin-top: 0.5rem;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .reserve-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 1024px) {
          .content-container {
            flex-direction: column;
          }

          .right-column {
            width: 100%;
            position: static;
            margin-top: 2rem;
          }

          .rules-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .image-gallery {
            grid-template-columns: 1fr;
            height: auto;
          }

          .secondary-images {
            grid-template-columns: 1fr 1fr;
            height: 250px;
          }

          .amenities-grid {
            grid-template-columns: 1fr;
          }

          .review-categories {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LocationDetails;
