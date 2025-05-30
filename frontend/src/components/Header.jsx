import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../auth";
import logo from "../assets/airbnb-logo.png";
import { useState } from "react";
import { FaBars, FaUserCircle, FaGlobe } from "react-icons/fa";

const Header = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={`header ${isHomePage ? "header-home" : ""}`}>
      <nav className="nav-container">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Airbnb Logo" className="logo" />
        </Link>

        {/* Center Navigation */}
        <div className="center-nav">
          <Link to="/locations" className="nav-link">
            Places to stay
          </Link>
          <span className="nav-link">Experiences</span>
          <span className="nav-link">Online Experiences</span>
        </div>

        {/* Right Menu */}
        <div className="right-menu">
          {/* Only show "Become a Host" if user is not a host */}
          {(!user || user.role !== "host") && (
            <Link to="/admin-login" className="host-link">
              Become a Host
            </Link>
          )}
          <FaGlobe className="globe-icon" />

          {/* Dropdown */}
          <div className="user-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars color={isHomePage ? "#000" : "#000"} />{" "}
            <FaUserCircle color={isHomePage ? "#000" : "#000"} />
          </div>

          {menuOpen && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <p style={{ marginBottom: "0.5rem", color: "#000" }}>
                    Hi, {user.username}
                  </p>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button onClick={() => navigate("/login")}>Login</button>
              )}
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        .header {
          padding: 1rem;
          background-color: #fff;
          color: #000;
        }

        .header-home {
          background-color: #000;
          color: #fff;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
        }

        .logo {
          height: 64px;
        }

        .center-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: #aaa;
          text-decoration: none;
          cursor: pointer;
        }

        .header-home .nav-link {
          color: #ddd;
        }

        .right-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }

        .host-link {
          color: #000;
          text-decoration: none;
        }

        .header-home .host-link {
          color: #fff;
        }

        .globe-icon {
          color: #000;
        }

        .header-home .globe-icon {
          color: #fff;
        }

        .user-menu {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 999px;
          padding: 0.5rem;
          cursor: pointer;
          background: #fff;
          gap: 0.5rem;
        }

        .dropdown-menu {
          position: absolute;
          top: 3rem;
          right: 0;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 999;
          min-width: 150px;
        }

        .user-greeting {
          margin-bottom: 0.5rem;
          color: #000;
        }

        .logout-btn,
        .login-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #000;
          width: 100%;
          text-align: left;
          padding: 0.25rem 0;
        }

        .logout-btn:hover,
        .login-btn:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .center-nav {
            display: none;
          }

          .logo {
            height: 48px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
