import { Navigate, Outlet } from "react-router-dom";

const ProtecedRouting = () => {
  const isAuthToken = sessionStorage.getItem("JWT_TOKEN");
  return isAuthToken ? <Outlet /> : <Navigate to={`/access_denied`} />;
};

export default ProtecedRouting;
