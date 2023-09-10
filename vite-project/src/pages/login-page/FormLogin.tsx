import { useEffect, useRef, useState } from "react";
import { Login } from "../../services/apiUser";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDataUser } from "features/DataUserSlice/dataUserSlice";
import { User } from "model/Auth.model";
import { setToken } from "features/DataUserSlice/authSlice";

const FormLogin = () => {
  const checkBox = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  // const payload = useSelector((state: RootState) => state.dataUser);
  const dispatch = useDispatch();
  //post api
  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.code === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [inputName, inputPassword]);
  const handlePostAPI = async (data: User) => {
    try {
      const response = await Login(data);

      dispatch(getDataUser(response.data.data.user));

      if (response.data?.success) {
        //save token to local storage
        console.log(response.data.data);

        localStorage.setItem("token", response.data.data?.user.token);
        localStorage.setItem(
          "dataUser",
          JSON.stringify(response.data.data?.user)
        );
        console.log(response.data.data.user.role);

        //save tokent redux
        dispatch(
          setToken({
            userToken: response.data.data?.user.token,
          })
        );
        navigate("/", { replace: true });
      } else {
        toast.error("Not logged in");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        toast.error("Password Incorrect !!!");
      } else if (err.response && err.response.status === 404) {
        toast.error("Account not exist !!!");
      }
    }
  };
  //checkBox
  const handleClickCheckBox = () => {
    checkBox &&
      checkBox.current &&
      checkBox.current.classList.toggle("opacity-0");
  };
  //change input name user
  const handleChangeInputName = (value: string) => {
    setInputName(value.trim());
  };
  //change input password
  const handleChangeInputPassword = (value: string) => {
    setInputPassword(value.trim());
  };
  const handleSubmit = () => {
    if (inputName.length === 0) {
      toast.warning("Please Provide UserName !!!");
    } else if (inputPassword.length === 0) {
      toast.warning("Please Provide Password !!!");
    } else {
      const username = inputName;
      const password = inputPassword;
      handlePostAPI({ username, password });
    }
  };
  return (
    <div className="w-full flex justify-center   ">
      <div className="rounded-sm  px-5 sm:border-2 sm:border-solid sm:border-[#999999]  w-[480px]">
        {/* title  */}
        <header className="text-center m-[20px] text-[24px] font-extrabold">
          <h1>로그인</h1>
        </header>
        {/* form login */}
        <form action="#" className="flex flex-col">
          <label className="text-[16px]" htmlFor="name">
            아이디
          </label>
          <input
            value={inputName}
            onChange={(e) => handleChangeInputName(e.target.value)}
            placeholder="아이디를 입력하세요."
            className="focus:outline-none text-[16px] p-[6px] pl-[12px] mt-[4px] mb-[4px] border-2 border-[#999999] border-solid"
            type="text"
            id="name"
          />
          <label className="text-[16px]" htmlFor="password">
            비밀번호
          </label>
          <input
            value={inputPassword}
            onChange={(e) => handleChangeInputPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요."
            className="focus:outline-none text-[16px] p-[6px] pl-[12px] mt-[4px] mb-[4px] border-2 border-[#999999] border-solid"
            type="password"
            id="password"
          />
        </form>
        {/* checkbox */}
        <div className="mt-[10px] flex items-center">
          <div className="h-5 w-5 relative " onClick={handleClickCheckBox}>
            <input disabled className="h-5 w-5 " type="checkbox" />
            <i
              className=" text-[#FF4040] bi bi-check2 absolute left-[2px] top-[-2px] opacity-1"
              ref={checkBox}
            ></i>
          </div>
          <span className="ml-[6px] text-[14px]">아이디 기억하기</span>
        </div>
        {/* button submit */}
        <div className="flex flex-col  mt-[60px] mb-[20px]">
          <button
            onClick={handleSubmit}
            className="hover:opacity-80 hover: text-white h-[60px] bg-gradient-to-r from-blue-600 to-blue-400"
          >
            확인
          </button>
          <Link to="/register" className="w-full">
            <button className="hover:opacity-60 opacity-100 h-[40px] border-2 border-solid border-#ACACAC bg-[#F6F6F6] mt-[6px] w-full">
              리빙랩 회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
