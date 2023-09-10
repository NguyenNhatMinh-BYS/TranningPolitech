import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
  const dataUser = localStorage.getItem("dataUser");
  const [auth] = useState(dataUser ? JSON.parse(dataUser).role : null);
  const location = useLocation();
  console.log(auth);
  return auth === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace={true} />
  );
};

export default AdminAuth;
