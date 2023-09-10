import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
const NormalAuth = () => {
  const dataUser = localStorage.getItem("dataUser");
  const [auth] = useState(dataUser ? JSON.parse(dataUser).role : null);
  console.log(auth);
  const location = useLocation();
  return auth === "Normal" ? (
    <Outlet />
  ) : auth === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace={true} />
  );
};

export default NormalAuth;
