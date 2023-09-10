import Banner from "@/component/banner/Banner";
import Content from "./component/Content";
import { useEffect } from "react";
import imgPage8 from "assets/img/BannerPage8.png";
import iconPage8 from "assets/img/iconPage8.png";
const Freeboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className=" pt-[100px]">
      <Banner
        imgBanner={imgPage8}
        icon={iconPage8}
        text={"깨바부의 다양한 콘텐츠를 확인해보세요."}
      />
      <Content />
    </div>
  );
};

export default Freeboard;
