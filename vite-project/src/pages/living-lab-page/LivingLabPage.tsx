import Banner from "@/component/banner/Banner";
import Content from "./component/Content";
import imgPage6 from "assets/img/bannerPage6.png";
import iconPage6 from "assets/img/iconPage6.png";
import { useEffect } from "react";
const LivingLabPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className=" pt-[100px]">
      <Banner
        imgBanner={imgPage6}
        icon={iconPage6}
        text={
          "깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다."
        }
      />
      <Content />
    </div>
  );
};

export default LivingLabPage;
