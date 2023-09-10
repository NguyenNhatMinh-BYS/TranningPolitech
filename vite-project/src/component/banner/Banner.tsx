import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Banner = ({ imgBanner, icon, text }: any) => {
  const showTitleBanner = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo({ top: 0 });
  },[])
  useEffect(() => {
    if (location.pathname !== "/facility") window.scrollTo({ top: 0 });
  });
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY <= 0) {
      }
    });
    showTitleBanner.current?.classList.remove(
      ..."top-[250px] opacity-0 pointer-events-none".split(" ")
    );
  }, []);
  return (
    <div className=" relative h-[300px] ">
      <img src={imgBanner} alt="BannerImg" className="h-full object-cover" />
      <div className="bg-[#3535357e] absolute w-full h-[300px] top-0"></div>
      <div
        className=" w-full  flex justify-center flex-col absolute top-[150px] top-[250px] transition-all duration-1000 ease-in-out opacity-0 pointer-events-none "
        ref={showTitleBanner}
      >
        <div className=" flex justify-center">
          <img className="mt-[-40px]  " src={icon} alt="banner img" />
        </div>
        <p className="text-center text-white relative mt-[20px] text-[24px]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Banner;
