import HeroImage from "../assets/hero-image.jpg";

const Home = () => {
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

  const experiences = [
    {
      title: "Discover Airbnb Experiences",
      subtitle: "Things to do on your trip",
      type: "Experiences",
    },
    {
      title: "Thing to do from home",
      subtitle: "",
      type: "Online Experiences",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div
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
      </div>

      {/* Destinations Section */}
      <div className="section-container">
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
      </div>

      {/* Experiences Section */}
      {/* <div className="section-container">
        <div className="experiences-grid">
          {experiences.map((experience, index) => (
            <div key={index} className="experience-card">
              <div className="experience-content">
                <h3 className="experience-title">{experience.title}</h3>
                {experience.subtitle && (
                  <p className="experience-subtitle">{experience.subtitle}</p>
                )}
                <p className="experience-type">{experience.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <style jsx>{`
        /* Hero Section */
        .hero-section {
          position: relative;
          height: 80vh;
          min-height: 500px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          color: #fff;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 15vh;
          width: 100%;
          padding: 0 2rem;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0) 100%
          );
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
          font-weight: 600;
          font-size: 1rem;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .hero-button:hover {
          transform: scale(1.03);
        }

        /* Sections */
        .section-container {
          width: 80%;
          margin: 2rem auto;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #222;
        }

        /* Destinations Row - 4 cards in a row */
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
          cursor: pointer;
          transition: transform 0.2s;
          background: white;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
          margin: 0 0 0.5rem;
        }

        .destination-distance {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
        }

        /* Experiences Grid */
        .experiences-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .experience-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transition: transform 0.2s;
          cursor: pointer;
          border: 1px solid #e0e0e0;
        }

        .experience-card:hover {
          transform: translateY(-5px);
        }

        .experience-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .experience-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #222;
        }

        .experience-subtitle {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 1rem 0;
        }

        .experience-type {
          font-size: 0.9rem;
          color: #666;
          margin: auto 0 0 0;
          padding-top: 0.5rem;
          border-top: 1px solid #eee;
        }

        @media (max-width: 1024px) {
          .destinations-row {
            flex-wrap: wrap;
          }

          .destination-card {
            flex: 0 0 calc(50% - 0.75rem);
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-content {
            margin-bottom: 10vh;
          }

          .section-container {
            padding: 0 1rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .destination-name {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 1024px) {
          .destination-card {
            flex: 1 1 calc(50% - 0.75rem);
            height: 300px;
          }
        }

        @media (max-width: 640px) {
          .destination-card {
            flex: 1 1 100%;
          }

          .destination-img {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
