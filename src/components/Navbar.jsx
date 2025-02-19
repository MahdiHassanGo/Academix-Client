import React, { useContext, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeContext";

const Navbar = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
     
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-orange-500 to-orange-600  shadow-md w-full fixed right-0 top-0 z-50">
        <div className="flex justify-between items-center py-4 px-6">
        <button
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-2xl md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-[100px]"
              src="../../assets/Logo.png"
              alt="Academix"
            />
          </Link>
          <label className="swap swap-rotate text-white">
  {/* Checkbox to toggle theme */}
  <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />

  {/* Sun Icon (Light Mode) */}
  <svg
    className="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* Moon Icon (Dark Mode) */}
  <svg
    className="swap-on h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>



         
    

      
          <div
            className={`absolute top-16 left-0 w-full  z-10 p-4 transition-all duration-300 ease-in md:static md:flex md:p-0 md:gap-6 md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
          <ul className="mt-5 bg-opacity-0 backdrop-blur-md flex flex-col gap-4 md:flex-row ">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-Buttons font-semibold border-b-2 border-Buttons pb-1"
                      : "md:text-white text-xl font-bold md:text-sm hover:text-Buttons"
                  }
                  onClick={() => setIsMenuOpen(false)} 
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allclassespublic"
                  className={({ isActive }) =>
                    isActive
                      ? "text-Buttons font-semibold border-b-2 border-Buttons pb-1"
                      : "md:text-white text-xl font-bold md:text-sm hover:text-Buttons"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addteacher"
                  className={({ isActive }) =>
                    isActive
                      ? "text-Buttons font-semibold border-b-2 border-Buttons pb-1"
                      : "text-black md:text-white text-xl font-bold md:text-sm hover:text-Buttons"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teach on Academix
                </NavLink>
              </li>
            </ul>
          </div>

     
          <div className="relative flex items-center gap-4">
            {user && user?.email ? (
              <>
                <img
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user?.photoURL}
                  alt="User Profile"
                  onClick={toggleUserMenu}
                />
                {isUserMenuOpen && (
                  <div className="absolute top-10 -left-20 md:right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-30">
                    <div className="p-4 text-black border-b">
                      {user?.displayName}
                    </div>
                    <NavLink
                      to="/dashboard/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                     Dashboard
                    </NavLink>
                   
                  </div>
                )}
              </>
            ) : (
              <FaUser className="text-white" />
            )}
            {user ? (
              <button
                onClick={handleLogOut}
                className="bg-Buttons text-black px-1 py-1 md:py-2 md:px-4 rounded hover:bg-opacity-90 transition"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
