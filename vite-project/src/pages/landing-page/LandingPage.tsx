import { useLocation, useNavigate } from "react-router-dom";
import Banner from "./components/Banner";
import Content from "./components/Content";
import { useEffect } from "react";
const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full bg-white ">
      <Banner />
      <div className=" relative z-[10] bg-white pt-[10px]">
        <Content />
      </div>
    </div>
  );
};

export default LandingPage;
