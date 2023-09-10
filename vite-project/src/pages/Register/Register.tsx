import HeaderLogin from "../login-page/HeaderLogin";
import Footer from "@/component/footter/Footer";
import FormRegister from "./FormRegister";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "app/store";
const Register = () => {
  const tokens = useSelector((state: RootState) => state.auth.userToken);
  const naviagte = useNavigate();

  useEffect(() => {
    if (tokens || localStorage.getItem("token")) {
      naviagte("/");
    }
  }, [tokens]);
  return (
    <div className="w-full h-screen flex  flex-col ">
      <div className="grow-[9] flex items-center justify-center mx-[60px]">
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;
