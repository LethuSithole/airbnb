import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../auth';

const PublicRoute = () => {
  const user = getUser();

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
