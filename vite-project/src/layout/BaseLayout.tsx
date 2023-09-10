import Footer from "@/component/footter/Footer";
import Nav from "@/component/navigate/Nav";
import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <div className=" relative z-[10] bg-white pt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;
