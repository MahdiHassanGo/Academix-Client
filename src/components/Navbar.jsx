import React, { useContext, useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
