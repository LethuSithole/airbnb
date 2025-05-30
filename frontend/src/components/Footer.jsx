import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Support",
      links: [
        "Help Center",
        "Safety information",
        "Cancellation options",
        "Our COVID-19 Response",
        "Supporting people with disabilities",
        "Report a neighborhood concern",
      ],
    },
    {
      title: "Community",
      links: [
        "Airbnb.org: disaster relief housing",
        "Support Afghan refugees",
        "Celebrating diversity & belonging",
        "Combating discrimination",
      ],
    },
    {
      title: "Hosting",
      links: [
        "Try hosting",
        "AirCover: protection for Hosts",
        "Explore hosting resources",
        "Visit our community forum",
        "How to host responsibly",
      ],
    },
    {
      title: "About",
      links: [
        "Newsroom",
        "Learn about new features",
        "Letter from our founders",
        "Careers",
        "Investors",
        "Airbnb Luxe",
      ],
    },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-columns">
          {footerLinks.map((column, index) => (
            <div key={index} className="footer-column">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© {currentYear} Airbnb, Inc.</span>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
          <div className="footer-language">
            <span>English (US)</span>
            <span>USD</span>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          background-color: #f7f7f7;
          margin: 2rem 0 0 0;
          padding: 48px 80px 24px;
          border-top: 1px solid #dddddd;
        }

        .footer-content {
          width: 100%;
          margin: 0 auto;
        }

        .footer-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-column h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #222222;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column li {
          margin-bottom: 12px;
        }

        .footer-column a {
          color: #717171;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-column a:hover {
          color: #222222;
          text-decoration: underline;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid #dddddd;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .footer-legal span,
        .footer-legal a {
          font-size: 14px;
          color: #717171;
        }

        .footer-legal a {
          text-decoration: none;
        }

        .footer-legal a:hover {
          text-decoration: underline;
        }

        .footer-language {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .footer-language span {
          font-size: 14px;
          color: #222222;
          font-weight: 500;
        }

        .social-icons {
          display: flex;
          gap: 12px;
          margin-left: 20px;
        }

        .social-icons a {
          color: #222;
          font-size: 18px;
          transition: color 0.3s;
        }

        .social-icons a:hover {
          color: #ff385c;
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 32px 24px;
          }

          .footer-columns {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .footer-columns {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
