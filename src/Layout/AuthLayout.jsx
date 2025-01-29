import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <div className="">
    

      <header className="py-3 w-11/12 mx-auto mt-5">
      <Navbar></Navbar>
        <Outlet></Outlet>
      </header>

      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
