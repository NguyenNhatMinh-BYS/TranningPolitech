import { useRef, useState } from "react";
import logo from "assets/img/logo@2x.png";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { setToken } from "@/features/DataUserSlice/authSlice";
import { useDispatch } from "react-redux";

const Nav = () => {
  const scrollYElement = useRef<HTMLDivElement>(null);
  const navIcon = useRef<HTMLDivElement>(null);
  const navIconClose = useRef<HTMLDivElement>(null);
  const navIconOpen = useRef<HTMLDivElement>(null);
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const shadow = useRef("");
  const [role, setRole] = useState("");
  const [bg, setBg] = useState("");
  const colorText = useRef<String>("text-white");
  const [textNav, setTextNav] = useState<String>(colorText.current);
  const active = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isPageLogin, setIsPageLogin] = useState(false);
  useEffect(() => {
    if (location.pathname !== "/") {
      colorText.current = "text-black";
      shadow.current = "shadow-lg";
    } else {
      colorText.current = "text-white";
      shadow.current = "";
      setBg("bg-transparent");
    }
    setTextNav(colorText.current);
  }, [location.pathname]);
  useEffect(() => {
    if (
      location.pathname === "/living-lab" ||
      location.pathname === "/manager-user"
    ) {
      active.current?.classList.add(..."text-white font-bold".split(" "));
    } else if (
      location.pathname !== "/living-lab" &&
      location.pathname !== "/manager-user"
    ) {
      active.current?.classList.remove(..."text-white font-bold".split(" "));
    }
    if (
      location.pathname === "/Login" ||
      location.pathname === "/login" ||
      location.pathname === "/register"
    ) {
      setIsPageLogin(true);
    } else {
      setIsPageLogin(false);
    }
  });
  useEffect(() => {
    const getLocalstorage = localStorage.getItem("dataUser");

    if (getLocalstorage) {
      var dataUser = JSON.parse(getLocalstorage);

      if (dataUser != null) {
        setIsLogin(true);
        setRole(dataUser.role);
      }
    }

    if (role === "Admin") {
      if (colorText.current === "text-black") {
        shadow.current = "shadow-lg";
        setBg("bg-gradient-to-b from-blue-600 to-blue-400");
        setTextNav("text-[#ffffffa8]");
      }
    } else if (role === "") {
      if (colorText.current === "text-black") {
        shadow.current = "shadow-lg";
        setBg("bg-white");
      }
    } else if (role === "Normal") {
      if (colorText.current === "text-black") {
        shadow.current = "shadow-lg";
        setBg("bg-gradient-to-b from-sky-600 to-teal-700");
      }
    }

    function handleScroll() {
      let scrollY = window.scrollY;

      if (role === "") {
        if (scrollY > 0 && colorText.current === "text-white") {
          setBg("bg-white");
          setTextNav("text-black");
          shadow.current = "shadow-lg";
        } else if (scrollY === 0 && colorText.current === "text-white") {
          setBg("bg-transparent");
          setTextNav("text-white");
          shadow.current = "";
        }
      }
      if (role === "Admin") {
        if (scrollY > 0 && colorText.current === "text-white") {
          setBg("bg-gradient-to-b from-blue-600 to-blue-400");
          setTextNav("text-[#ffffffa8]");
          shadow.current = "shadow-lg";
        } else if (scrollY === 0 && colorText.current === "text-white") {
          setBg("bg-transparent");
          setTextNav("text-white");
          shadow.current = "";
        }
      }
      if (role === "Normal") {
        if (scrollY > 0 && colorText.current === "text-white") {
          setBg("bg-gradient-to-b from-sky-600 to-teal-700");
          setTextNav("text-[#ffffffa8]");
          shadow.current = "shadow-lg";
        } else if (scrollY === 0 && colorText.current === "text-white") {
          setBg("bg-transparent");
          setTextNav("text-white");
          shadow.current = "";
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shadow, textNav, location.pathname, colorText.current]);
  // click logo
  const handleClickLogo = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };
  // click icon nav

  const handleClickOpenNav = () => {
    document.body.style.overflow = "hidden";
    navIcon &&
      navIcon.current &&
      navIcon.current.classList.remove("text-white");
    const addClass =
      "max-[1279px]:right-10 max-[1279px]:translate-x-full max-[1279px]:opacity-0 max-[1279px]:pointer-events-none";
    navIcon &&
      navIcon.current &&
      navIcon.current.classList.remove(...addClass.split(" "));

    const addClassListNav =
      "max-[1279px]:opacity-0 max-[1279px]:pointer-events-none";

    navIconClose &&
      navIconClose.current &&
      navIconClose.current.classList.remove(...addClassListNav.split(" "));
  };
  const handleClickCloseNav = () => {
    document.body.style.overflow = "auto";
    const addClass =
      "max-[1279px]:right-10 max-[1279px]:translate-x-full max-[1279px]:opacity-0 max-[1279px]:pointer-events-none";
    navIcon &&
      navIcon.current &&
      navIcon.current.classList.add(...addClass.split(" "));
    const addClassListNav =
      "max-[1279px]:opacity-0 max-[1279px]:pointer-events-none";
    navIconClose &&
      navIconClose.current &&
      navIconClose.current.classList.add(...addClassListNav.split(" "));
  };
  //logout
  const Logout = () => {
    dispath(setToken({ userToken: null }));
    localStorage.clear();
    handleClickCloseNav();
    setIsLogin(false);
    setRole("");
  };
  const handleClickList = (to: string) => {
    navigate(to);
  };

  return (
    <div>
      {isPageLogin ? (
        <div className="bg-gradient-to-b from-blue-600 to-blue-400 h-[100px] w-full flex justify-center fixed">
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
      ) : (
        <div
          className={`flex ${bg}  justify-center w-full fixed	z-[100]  transform transition-all duration-200 linear  top-0 ${shadow.current}`}
          ref={scrollYElement}
        >
          <header
            className=" justify-between flex h-100  items-center w-80  "
            ref={scrollYElement}
          >
            <div
              onClick={handleClickLogo}
              className="flex w-1/2 text-white items-center"
            >
              <img
                className="h-full w-56 cursor-pointer object-cover mr-[10px]"
                src={logo}
                alt="logo"
              />
              {role === "Admin" ? (
                <p>[ 관리자 ]</p>
              ) : role === "Normal" ? (
                <p>[ 리빙랩 관리자 ]</p>
              ) : (
                ""
              )}
            </div>
            {role !== "Normal" ? (
              <div
                ref={navIcon}
                className={`  xl:pt-8 xl:sm:backdrop-blur-0  xl:block xl:h-full xl:w-full xl:right-0 xl:translate-y-2 xl:text-end xl:leading-3  xl:static xl:bg-transparent xl:translate-x-0 xl:opacity-100  xl:pointer-events-auto  sm:transform sm:transition-all sm:duration-100 sm:linear max-[1279px]:flex max-[1279px]:flex-col max-[1279px]:absolute max-[1279px]:top-0 max-[1279px]:bg-nav max-[1279px]:p-6  max-[1279px]:w-full max-[1279px]:h-screen max-[1279px]:right-0  max-[1279px]:right-10 max-[1279px]:backdrop-blur-md sm:bg-[#7d7d7d90] max-[1279px]:translate-x-full max-[1279px]:opacity-0 max-[1279px]:pointer-events-none max-[1279px]:text-end max-[1279px]:pt-20 max-[1279px]:pr-16 ${textNav} `}
              >
                <NavLink
                  onClick={handleClickCloseNav}
                  to="/"
                  className={({ isActive }) =>
                    isActive && role === "Admin"
                      ? "text-white font-semibold sm:mt-9"
                      : isActive
                      ? "text-main font-semibold sm:mt-9"
                      : "sm:mt-9"
                  }
                >
                  <span
                    className="m-2.5 text-xl   "
                    onClick={() =>
                      window.scroll({ top: 0, behavior: "smooth" })
                    }
                  >
                    홈
                  </span>
                </NavLink>
                <NavLink
                  onClick={handleClickCloseNav}
                  to="/introduce"
                  className={({ isActive }) =>
                    isActive && role === "Admin"
                      ? "text-white font-semibold sm:mt-9"
                      : isActive
                      ? "text-main font-semibold sm:mt-9"
                      : "sm:mt-9"
                  }
                >
                  <span
                    className="m-2.5 text-xl sm:mt-4"
                    onClick={() =>
                      window.scroll({ top: 0, behavior: "smooth" })
                    }
                  >
                    소개
                  </span>
                </NavLink>
                <NavLink
                  onClick={handleClickCloseNav}
                  to="/announcement"
                  className={({ isActive }) =>
                    isActive && role === "Admin"
                      ? "text-white font-semibold sm:mt-9"
                      : isActive
                      ? "text-main font-semibold sm:mt-9"
                      : "sm:mt-9"
                  }
                >
                  <span
                    className="m-2.5 text-xl sm:mt-4"
                    onClick={() =>
                      window.scroll({ top: 0, behavior: "smooth" })
                    }
                  >
                    공지사항
                  </span>
                </NavLink>
                <NavLink
                  onClick={handleClickCloseNav}
                  to="/facility"
                  className={({ isActive }) =>
                    isActive && role === "Admin"
                      ? "text-white font-semibold sm:mt-9"
                      : isActive
                      ? "text-main font-semibold sm:mt-9"
                      : "sm:mt-9"
                  }
                >
                  <span
                    className="m-2.5 text-xl sm:mt-4"
                    onClick={() =>
                      window.scroll({ top: 0, behavior: "smooth" })
                    }
                  >
                    시설현황
                  </span>
                </NavLink>
                <NavLink
                  onClick={handleClickCloseNav}
                  to="/content"
                  className={({ isActive }) =>
                    isActive && role === "Admin"
                      ? "text-white font-semibold sm:mt-9"
                      : isActive
                      ? "text-main font-semibold sm:mt-9"
                      : "sm:mt-9"
                  }
                >
                  {" "}
                  <span
                    className="m-2.5 text-xl sm:mt-4"
                    onClick={() =>
                      window.scroll({ top: 0, behavior: "smooth" })
                    }
                  >
                    콘텐츠
                  </span>
                </NavLink>
                {role === "Admin" ? (
                  <div className="inline-block relative  parent sm:mt-[28px] xl:mt-0 cursor-pointer">
                    <span
                      className="m-2.5 text-xl sm:mt-4"
                      onClick={() =>
                        window.scroll({ top: 0, behavior: "smooth" })
                      }
                      ref={active}
                    >
                      리빙랩
                    </span>
                    <div className="  sm:right-[40px]  absolute w-[160px] h-auto bg-white text-black border-[1px] border-[black] xl:left-0 xl:right-0  child  ">
                      <div
                        className="py-[10px] px-[18px] text-lg font-normal text-center hover:bg-[#9e9e9e94]"
                        onClick={(e) => {
                          handleClickList("/living-lab");
                        }}
                      >
                        게시글 관리
                      </div>

                      <div
                        className="py-[10px] px-[18px] text-lg font-normal text-center hover:bg-[#9e9e9e94] "
                        onClick={(e) => {
                          handleClickList("/manager-user");
                        }}
                      >
                        회원 관리
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    onClick={handleClickCloseNav}
                    to="/living-lab"
                    className={({ isActive }) =>
                      isActive && role === "Admin"
                        ? "text-white font-semibold sm:mt-9"
                        : isActive
                        ? "text-main font-semibold sm:mt-9"
                        : "sm:mt-9"
                    }
                  >
                    <span
                      className="m-2.5 text-xl sm:mt-4"
                      onClick={() =>
                        window.scroll({ top: 0, behavior: "smooth" })
                      }
                    >
                      캠페인
                    </span>
                  </NavLink>
                )}
                <NavLink
                  onClick={handleClickCloseNav}
                  to="/campaign"
                  className={({ isActive }) =>
                    isActive && role === "Admin"
                      ? "text-white font-semibold sm:mt-9"
                      : isActive
                      ? "text-main font-semibold sm:mt-9"
                      : "sm:mt-9"
                  }
                >
                  {" "}
                  <span
                    className="m-2.5 text-xl sm:mt-4"
                    onClick={() =>
                      window.scroll({ top: 0, behavior: "smooth" })
                    }
                  >
                    캠페인
                  </span>
                </NavLink>

                <NavLink
                  onClick={handleClickCloseNav}
                  to="/freeboard"
                  className={({ isActive }) =>
                    isActive && role === "Admin"
                      ? "text-white font-semibold sm:mt-9"
                      : isActive
                      ? "text-main font-semibold sm:mt-9"
                      : "sm:mt-9"
                  }
                >
                  {" "}
                  <span
                    className="m-2.5 text-xl sm:mt-4"
                    onClick={() =>
                      window.scroll({ top: 0, behavior: "smooth" })
                    }
                  >
                    자유게시판
                  </span>
                </NavLink>
                {isLogin ? (
                  <NavLink
                    onClick={Logout}
                    to="/login"
                    className={({ isActive }) =>
                      isActive && role === "Admin"
                        ? "text-white font-semibold sm:mt-9"
                        : isActive
                        ? "text-main font-semibold sm:mt-9"
                        : "sm:mt-9"
                    }
                  >
                    {" "}
                    <span
                      className="m-2.5 text-xl sm:mt-4"
                      onClick={() =>
                        window.scroll({ top: 0, behavior: "smooth" })
                      }
                    >
                      로그아웃
                    </span>
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
            ) : isLogin ? (
              <NavLink
                className="text-right w-1/2"
                onClick={Logout}
                to="/login"
              >
                <span className="m-2.5 text-xl sm:mt-4 text-white">
                  로그아웃
                </span>
              </NavLink>
            ) : (
              ""
            )}

            {role !== "Normal" ? (
              <div>
                <div onClick={handleClickOpenNav}>
                  <i
                    className={`bi bi-list  xl:hidden max-[1279px]:block max-[1279px]:text-4xl max-[1279px]:${colorText.current}`}
                    ref={navIconOpen}
                  ></i>
                </div>
                <div
                  ref={navIconClose}
                  onClick={handleClickCloseNav}
                  className="max-[1279px]:top-[30px] max-[1279px]:flex max-[1279px]:justify-between max-[1279px]:w-full max-[1279px]:transform max-[1279px]:transition-all max-[1279px]:duration-100 max-[1279px]:linear absolute max-[1279px]:opacity-0 max-[1279px]:pointer-events-none z-20 right-20 xl:hidden"
                >
                  {" "}
                  <img
                    src={logo}
                    alt="logo"
                    className="max-[1279px]:relative min-[640px]:left-44  w-56 cursor-pointer min-[180px]:left-32"
                  />
                  <i className="bi bi-x-lg  max-[1279px]:text-3xl max-[1279px]:text-nav "></i>
                </div>
              </div>
            ) : (
              ""
            )}
          </header>
        </div>
      )}
    </div>
  );
};

export default Nav;
