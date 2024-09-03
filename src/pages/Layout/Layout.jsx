import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
