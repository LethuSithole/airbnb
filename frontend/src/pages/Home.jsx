import SearchComponent from "../components/SearchComponent";
import HeroImage from "../assets/hero-image.jpg";
import ToDoHome from "../assets/to-do-your-home.jpg";
import ToDoTrip from "../assets/to-do-your-trip.jpg";
import GiftCards from "../assets/gift-cards.jpg";
import Questions from "../assets/questions.jpg";

const destinations = [
  {
    name: "Sandton City Hotel",
    distance: "53 km away",
    image:
      "https://ik.imgkit.net/3vlqs5axxjf/external/http://images.ntmllc.com/v4/hotel/T39/T39353/T39353_EXT_Z84491.jpg?tr=w-360%2Ch-379%2Cfo-auto",
  },
  {
    name: "Joburg City Hotel",
    distance: "168 km away",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/70690776.jpg?k=9882aca5376e6fe4f3ebcb3628a8690f044587c4890e72a175abe76779839851&o=&hp=1",
  },
  {
    name: "Woodmead Hotel",
    distance: "30 mins away",
    image: "https://sandtoncity.com/wp-content/uploads/hotels.jpg",
  },
  {
    name: "Hyde Park Hotel",
    distance: "34 km away",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295197715.jpg?k=6d76aab706363a85b55b6edf4d90a95ccec2c488e655e14ebe26dc0e6743a5e4&o=&hp=1",
  },
];

const Home = () => (
  <div className="home-container">
    {/* Hero Section */}
    <section className="hero-background">
      {/* Search Component */}
      <SearchComponent />
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Not sure where to go? Perfect.</h1>
          <button className="hero-button">I'm flexible</button>
        </div>
      </section>
    </section>

    {/* Destinations Section */}
    <section className="section-container">
      <h1 className="section-title">Inspiration for your next trip</h1>
      <div className="destinations-row">
        {destinations.map((destination, index) => (
          <div key={index} className="destination-card">
            <img
              src={destination.image}
              alt={destination.name}
              className="destination-img"
            />
            <div className="destination-content">
              <h2 className="destination-name">{destination.name}</h2>
              <p className="destination-distance">{destination.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Experiences Section */}
    <section className="section-container">
      <h1 className="section-title">Discover Airbnb Experiences</h1>
      <div className="experiences-row">
        <div
          className="experience-box"
          style={{ backgroundImage: `url(${ToDoTrip})` }}
        >
          <div className="experience-overlay">
            <h2>Things to do on your trip</h2>
            <button>Experiences</button>
          </div>
        </div>
        <div
          className="experience-box"
          style={{ backgroundImage: `url(${ToDoHome})` }}
        >
          <div className="experience-overlay">
            <h2>Things to do from home</h2>
            <button>Online Experiences</button>
          </div>
        </div>
      </div>
    </section>

    {/* Gift Cards Section */}
    <section className="giftcards-section">
      <div className="giftcards-container">
        <div className="giftcards-text">
          <h2>Shop Airbnb gift cards</h2>
          <button className="learn-more">Learn more</button>
        </div>
        <img src={GiftCards} alt="Gift Cards" className="giftcards-img" />
      </div>
    </section>

    {/* Hosting Questions Section */}
    <section
      className="hosting-section-full"
      style={{ backgroundImage: `url(${Questions})` }}
    >
      <div className="hosting-left-content">
        <h2>Questions about hosting?</h2>
        <button className="superhost-btn">Ask a Superhost</button>
      </div>
    </section>

    {/* Inspiration for Future Getaways Section */}
    <section className="inspiration-section">
      <h1 className="section-title">Inspiration for future getaways</h1>
      <div className="tabs">
        <span className="active-tab">Destinations for arts & culture</span>
        <span>Destinations for outdoor adventure</span>
        <span>Mountain cabins</span>
        <span>Beach destinations</span>
        <span>Popular destinations</span>
        <span>Unique Stays</span>
      </div>
      <div className="inspiration-grid">
        {[
          ["Phoenix", "Arizona"],
          ["Hot Springs", "Arkansas"],
          ["Los Angeles", "California"],
          ["San Diego", "California"],
          ["San Francisco", "California"],
          ["Barcelona", "Catalonia"],
          ["Prague", "Czechia"],
          ["Washington", "District of Columbia"],
          ["Keswick", "England"],
          ["London", "England"],
          ["Scarborough", "England"],
          ["Show more", ""],
        ].map(([city, region], index) => (
          <div className="inspiration-item" key={index}>
            <span className={city === "Show more" ? "show-more" : "city"}>
              {city}
            </span>
            {region && <span className="region">{region}</span>}
          </div>
        ))}
      </div>
    </section>

    {/* STYLES */}
    <style>{`
      .section-container,
      .giftcards-container,
      .hosting-section-full,
      .hero-section {
        width: 90%;
        margin: 3rem auto;
      }

      .section-title {
        font-size: 36px;
        margin: 1.5rem 0;
      }

      .hero-background {
        background: #000000;
        padding: 2rem 0; 
      }

      .hero-section {
        position: relative;
        height: 100vh;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        border-radius: 6px;
        color: #fff;
      }

      .hero-content {
        text-align: center;
        margin-bottom: 5vh;
        width: 100%;
        padding: 0 2rem;
      }

      .hero-title {
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .hero-button {
        padding: 0.9rem 1.8rem;
        background-color: white;
        color: #222;
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 999px;
        border: none;
        cursor: pointer;
        transition: transform 0.2s;
      }

      .hero-button:hover {
        transform: scale(1.03);
      }

      .destinations-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: space-between;
        margin-bottom: 3rem;
      }

      .destination-card {
        flex: 1 1 calc(25% - 1.125rem);
        border-radius: 12px;
        overflow: hidden;
        background: white;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: transform 0.2s;
      }

      .destination-card:hover {
        transform: translateY(-5px);
      }

      .destination-img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }

      .destination-content {
        background: rgba(255, 56, 92, 0.9);
        color: white;
        padding: 1rem;
        min-height: 150px;
        text-align: left;
      }

      .destination-name {
        font-size: 1.8rem;
        font-weight: 600;
      }

      .destination-distance {
        font-size: 1.2rem;
        opacity: 0.9;
      }

      .experiences-row {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        align-items: stretch;
      }

      .experience-box {
        flex: 1;
        height: 60vh;
        background-size: cover;
        background-position: center;
        border-radius: 12px;
        position: relative;
        overflow: hidden;
      }

      .experience-overlay {
        position: absolute;
        top: 50px;
        left: 50px;
        color: white;
      }

      .experience-overlay h2 {
        font-size: 2.5rem;
        width: 250px;
        margin-bottom: 0.5rem;
      }

      .experience-overlay button {
        background: #fff;
        color: #000;
        border: none;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
      }

      .giftcards-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        padding: 2rem 0;
        flex-wrap: wrap;
      }

      .giftcards-text {
        flex: 1 1 300px;
        text-align: left;
      }

      .giftcards-img {
        flex: 1 1 300px;
        width: 100%;
        border-radius: 12px;
        width: 750px;
      }

      .giftcards-section h2 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .learn-more {
        background: black;
        color: white;
        border: none;
        padding: 1rem 1.5rem;
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 6px;
        margin-bottom: 1.5rem;
      }

      .hosting-section-full {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 90vh;
        border-radius: 12px;
        display: flex;
        align-items: center;
        padding: 0 4rem;
        color: white;
        position: relative;
      }

      .hosting-left-content {
        max-width: 400px;
      }

      .hosting-left-content h2 {
        font-size: 5rem;
        margin-bottom: 1rem;
      }

      .superhost-btn {
        background: white;
        color: black;
        padding: 1rem 1.5rem;
        font-size: 1.2rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }

      .inspiration-section {
        width: 90%;
        margin: 4rem auto;
      }

      .tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 2rem;
        font-size: 1rem;
      }

      .tabs span {
        cursor: pointer;
        color: #717171;
      }

      .tabs .active-tab {
        color: black;
        border-bottom: 2px solid black;
        padding-bottom: 4px;
        font-weight: 600;
      }

      .inspiration-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1.5rem;
      }

      .inspiration-item {
        display: flex;
        flex-direction: column;
      }

      .inspiration-item .city {
        font-weight: 600;
        color: #000;
      }

      .inspiration-item .region {
        color: #717171;
      }

      .inspiration-item .show-more {
        text-decoration: underline;
        color: #000;
        font-weight: 500;
        cursor: pointer;
      }

      @media (max-width: 1024px) {
        .destination-card {
          flex: 1 1 calc(50% - 1rem);
        }

        .experience-box {
          height: 50vh;
        }
      }

      @media (max-width: 768px) {
        .hero-title {
          font-size: 2rem;
        }

        .hero-content {
          margin-bottom: 10vh;
        }

        .experiences-row {
          flex-direction: column;
        }

        .giftcards-container {
          flex-direction: column;
          align-items: center;
        }

        .giftcards-text {
          text-align: center;
        }

        .destination-name {
          font-size: 1.2rem;
        }

        .experience-overlay h2 {
          font-size: 2rem;
          width: auto;
        }
      }

      @media (max-width: 640px) {
        .destination-card {
          flex: 1 1 100%;
        }

        .destination-img {
          height: 200px;
        }

        .hero-button {
          font-size: 0.9rem;
        }

        .experience-overlay {
          top: 30px;
          left: 20px;
        }

        .hosting-section-full {
          padding: 0 2rem;
        }

        .hosting-left-content h2 {
          font-size: 2rem;
        }
      }
    `}</style>
  </div>
);

export default Home;
