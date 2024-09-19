import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../components/common/Loading";
import { useEffect } from "react";
import Cookies from "js-cookie";
import React from "react";

const Layout = () => {

  const loading: boolean = useSelector((state) => state.loader.loading); //FIXME

  useEffect(() =>{
    const lang: string = Cookies.get("i18next");
    const dir: "rtl" | "ltr" = lang == "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute('dir', dir);
  }, []);

  return (
    <>
    { loading && <Loading />}
      <Navbar />

      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
