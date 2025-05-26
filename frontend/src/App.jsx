import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListing';
import ViewListings from './pages/ViewListings';
import EditListing from './pages/EditListing';
import Reservations from './pages/Reservations';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listings" element={<ViewListings />} />
          <Route path="/listings/create" element={<CreateListing />} />
          <Route path="/listings/edit/:id" element={<EditListing />} />
          <Route path="/reservations" element={<Reservations />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
