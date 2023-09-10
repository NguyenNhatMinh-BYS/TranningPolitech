import HeaderLogin from "./HeaderLogin";
import FormLogin from "./FormLogin";
import Footer from "@/component/footter/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const tokens = useSelector((state: RootState) => state.auth.userToken);
  const naviagte = useNavigate();

  useEffect(() => {
    if (tokens || localStorage.getItem("token")) {
      naviagte("/");
    }
  }, [tokens]);

  return (
    <>
      <div className="w-full h-screen flex  flex-col ">
        <div className="grow-[9] flex items-center">
          <FormLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
