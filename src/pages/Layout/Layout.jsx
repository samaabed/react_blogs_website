import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../components/common/Loading";

const Layout = () => {

  const loading = useSelector((state)=>state.loader.loading);
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
