import Banner from "@/component/banner/Banner";
import imgPage7 from "assets/img/BannerPage7.png";
import iconPage7 from "assets/img/iconPage7.png";
import Content from "./component/Content";
import { useState, useEffect } from "react";
import ContentAdmin from "./component/ContentAdmin";
const Campaign = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      setRole(JSON.parse(dataUser).role);
    }
  });

  return (
    <div className=" pt-[100px]">
      <Banner
        imgBanner={imgPage7}
        icon={iconPage7}
        text={"깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다."}
      />
      {role !== "Admin" ? <Content /> : <ContentAdmin />}
    </div>
  );
};

export default Campaign;
