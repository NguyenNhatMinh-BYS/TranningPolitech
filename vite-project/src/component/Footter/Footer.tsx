import logoFooter from "assets/img/logoFooter.png";
const Footer = () => {
  return (
    <footer className="w-full h-[158px] bg-footer mt-[20px] relative z-10">
      <div className="lg:w-80 flex items-center h-full  text-textFooter justify-center ">
        <div className="flex w-80 items-center min-[180px]:flex-col min-[100px]:items-start md:items-center md:flex-row ">
          <img
            src={logoFooter}
            alt="logoFooter"
            className="xl:h-32 min-[100px]:h-20"
          />
          <div className="ml-5">
            <p className="xl:text-sm min-[100px]:text-[10px]">
              <span>47340 부산광역시 부산진구 엄광로 176</span>|
              <span>TEL. 051-890-1754</span>| <span>FAX. 051-890-1759</span>
            </p>
            <p className="xl:text-sm min-[100px]:text-[10px]">
              COPYRIGHT 2023 DONG-EUI UNIVERSITY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
