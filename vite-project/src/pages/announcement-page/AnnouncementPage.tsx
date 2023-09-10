import Banner from "component/banner/Banner";
import Content from "./component/Content";
import imgPage3 from "assets/img/BannerPage3.png";
import iconPage3 from "assets/img/iconPage3.png";
const AnnouncementPage = () => {
  return (
    <div className=" pt-[100px]">
      <Banner
        imgBanner={imgPage3}
        icon={iconPage3}
        text={"깨바부의 새로운 소식을 전합니다."}
      />
      <Content />
    </div>
  );
};

export default AnnouncementPage;
