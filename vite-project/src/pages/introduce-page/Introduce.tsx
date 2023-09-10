import React, { useEffect } from "react";
import Nav from "@/component/navigate/Nav";
import Footer from "@/component/footter/Footer";
import ocean from "assets/img/ocean.png";
import logo from "assets/img/logo@2x.png";
import group513 from "assets/img/group513.png";
import group526 from "assets/img/group526.png";
import { useRef } from "react";

const Introduce = () => {
  const headerSmooth = useRef<HTMLDivElement>(null);
  const mainSmooth = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  useEffect(() => {
    function onScroll() {
      if (window.scrollY >= 220) {
        mainSmooth.current?.classList.remove(
          ..."opacity-0 mt-[300px]".split(" ")
        );
      }
    }
    window.addEventListener("scroll", onScroll);
    headerSmooth.current?.classList.remove(
      ..."opacity-0 mt-[300px]".split(" ")
    );
  }, []);
  return (
    <div className=" pt-[100px]">
      <div className="w-full flex justify-center text-[17px] text-[#4D4D4D] select-none">
        <div className="w-4/5  flex flex-col items-center mt-[80px]">
          <div
            className="flex flex-col items-center opacity-0 mt-[300px] transition-all duration-1000 ease-in "
            ref={headerSmooth}
          >
            <img src={ocean} alt="ocean" className="h-[100px]" />
            <img src={logo} alt="logo" className="mt-[20px] h-[60px]   " />
            <h1 className="font-bold mt-[20px] text-[26px]">
              안녕하십니까. 깨끗한 바다 부산 홈페이지 방문을 환영합니다.
            </h1>
            <div className="mt-[60px] text-center text-[17px] w-4/5">
              제2 수도로 불리는 부산은 동남권에는 바다가, 북서로는 낙동강이
              흐르고 있는{" "}
              <span className="text-[#0066C1] font-semibold">친수도시</span>로
              지리적 이점과 풍부한 해양자원을 바탕으로{" "}
              <span className="text-[#0066C1] font-semibold">항만물류</span>,
              해양수산, 관광·MICE산업 등 고부가가치 산업기반의{" "}
              <span className="text-[#0066C1] font-semibold">
                글로벌 해양도시
              </span>
              로 나아가고 있습니다.
            </div>
            <div className="mt-[60px] px-[60px] py-[30px] border-solid border-[2px] rounded-sm">
              <img src={group513} alt="group513" />
            </div>
          </div>
          <div
            ref={mainSmooth}
            className="w-full opacity-0 mt-[300px]  transition-all duration-1000 ease-in"
          >
            <div className="mt-[60px] text-center">
              그러나{" "}
              <span className="font-bold text-[#1D1D1D]">
                낙동강 하류와 근해에 밀려오는 막대한 양의 해양쓰레기
              </span>
              로 인해 환경오염, 생태계 파괴, 미세플라스틱{" "}
              <span className="font-bold text-[#1D1D1D]">
                문제 등 부산의 해양자원과 시민의 안전이 위협
              </span>
              받고 있습니다. 이에 부산광역시는 시민단체와 다양한 환경 정화
              활동을 통해 해마다 50만 톤에 달하는 해양쓰레기를 수거하고 있지만
              안전한 접근이 보장되지 않는 테트라포드와 습지의 경
              <span className="font-bold text-[#1D1D1D]">
                우 여전히 수거 사각지대
              </span>
              로 남아 있습니다.
            </div>
            <div className="mt-[60px] text-center px-[60px]">
              ‘깨바부 (깨끗한 바다 부산)’는 이러한 지역현안 문제 해결을 위해
              부산지역 내 수거 사각지대인 테트라포트(72개소)와 습지(1개소) 현황
              정보를 제공하고 해양쓰레기 문제의 심각성을 인지할 수 있는 콘텐츠를
              게시함으로써 깨끗한 바다·강 만들기 문화를 홍보하고 확산하고자
              합니다. 또한, 수거 사각지대의 쓰레기 문제의 해결방안에 대해
              주민들과 자유롭게 논의하고 공감하기 위하여 시민의 의견을 상시
              수집할 수 있는 자유게시판을 운영하여 시민의 소리에 귀
              기울이겠습니다.
            </div>
          </div>
          <div className="mt-[60px] px-[60px] py-[30px] border-solid border-[2px] rounded-sm">
            <img src={group526} alt="group526" />
          </div>
          <div className="my-[100px]">
            아름다운 미래 해양도시 부산을 위하여 시민 여러분들의 많은 관심과
            참여를 부탁드립니다. 감사합니다.
          </div>
          <div className="px-[10px] py-[30px] border-solid border-[2px] rounded-sm mb-[60px] text-center text-[16px] bg-[#F9F9F9]">
            본 사이트는 과학기술정보통신부에서 시행하는
            원천기술개발사업-국민공감·국민참여 R&SD
            선도사업-주민공감현장문제해결사업과 부산광역시의 지원을 받아
            제작되었습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
