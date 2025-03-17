import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("userToken"); // Check login status

  return isAuthenticated ? <Navigate to="/Home"/> : <Outlet/>;
};

export default PrivateRoute;
