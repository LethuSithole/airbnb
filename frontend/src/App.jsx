import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListing";
import ViewListings from "./pages/ViewListings";
import EditListing from "./pages/EditListing";
import Reservations from "./pages/Reservations";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/admin-login"];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      {<Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/listings" element={<ViewListings />} />
            <Route path="/listings/create" element={<CreateListing />} />
            <Route path="/listings/edit/:id" element={<EditListing />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
