import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../components/common/Loading";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Layout = () => {

  const loading = useSelector((state)=>state.loader.loading);

  useEffect(() =>{
    const lang = Cookies.get("i18next");
    const dir = lang == "ar" ? "rtl" : "ltr";
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
