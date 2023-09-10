import logo from "assets/img/logo@2x.png";
import { useNavigate } from "react-router-dom";
const HeaderLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-400 h-[100px] w-full flex justify-center">
      <div className="flex items-center h-full w-80 ">
        <img
          src={logo}
          alt="logo"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="bg-red h-full flex items-end m-4">
          {" "}
          <p className=" mb-8 text-white">[ 관리자 ]</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogin;
