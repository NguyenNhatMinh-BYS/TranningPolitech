import React, { useEffect, useState } from "react";
import imgPage5 from "assets/img/BannerPage5.png";
import Banner from "component/banner/Banner";
import iconPage5 from "assets/img/iconPage5.png";
import Content from "./components/Content";
import ContentAdmin from "./components/ContentAdmin";
const ContentPage = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      setRole(JSON.parse(dataUser).role);
    }
  });

  return (
    <div className=" pt-[100px]">
      <div id="video">
        <Banner
          imgBanner={imgPage5}
          icon={iconPage5}
          text={"깨바부의 다양한 콘텐츠를 확인해보세요."}
        />
      </div>
      {role !== "Admin" ? <Content /> : <ContentAdmin />}
    </div>
  );
};

export default ContentPage;
