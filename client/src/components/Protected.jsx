import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default Protected;
