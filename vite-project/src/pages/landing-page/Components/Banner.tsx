import { useState, useEffect, useRef } from "react";
import banner1 from "assets/img/banner1.png";
import banner2 from "assets/img/banner2.png";
import banner3 from "assets/img/banner3.png";

import "./style.css";

const Banner = () => {
  const show = useRef<HTMLDivElement>(null);
  const [imgCurrent, setImgCurrent] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    show.current?.classList.remove(..."opacity-0 mt-[200px]".split(" "));
  }, []);

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const allImg = document.querySelectorAll(".slideImg");

      if (imgCurrent === 2) {
        setImgCurrent(0);
        allImg[0].classList.remove(..."opacity-0 scale-125".split(" "));
        allImg[2].classList.add(..."opacity-0 scale-125".split(" "));
      } else {
        setImgCurrent(imgCurrent + 1);
        allImg[imgCurrent + 1].classList.remove(
          ..."opacity-0 scale-125".split(" ")
        );
        allImg[imgCurrent].classList.add(..."opacity-0 scale-125".split(" "));
      }
    }, 5000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="h-screen w-full relative z-0">
      <div className="absolute">
        <img
          className="h-screen left-0 right-0 object-cover fixed z-[1] slideImg transition-all duration-[3s] ease-in-out opacity-1 scale-125"
          src={banner1}
          alt="banner img"
        />
        <img
          className="h-screen left-0 right-0 object-cover fixed z-[1] slideImg transition-all duration-[3s] ease-in-out opacity-0 scale-125"
          src={banner2}
          alt="banner img"
        />
        <img
          className="h-screen left-0 right-0 object-cover fixed z-[1] slideImg transition-all duration-[3s] ease-in-out opacity-0 scale-125"
          src={banner3}
          alt="banner img"
        />
      </div>
      <div
        className="fixed z-10 top-1/2 left-1/2  translate-y-50 translate-x-50 text-center opacity-0 mt-[200px] transition-all duration-1000 ease-in-out"
        ref={show}
      >
        <h1 className="text-4xl font-bold text-white">함께 하자,</h1>
        <h1 className="text-4xl font-bold text-white">깨끗한 바다 부산으로!</h1>
        <p className="text-xl mt-50 text-white">
          깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고
          있습니다.
        </p>
      </div>
    </div>
  );
};

export default Banner;
