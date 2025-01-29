import React, { useState } from "react";
import { FaBook, FaChalkboardTeacher, FaHome, FaUser, FaUserCog, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from './../hooks/useAdmin';
import useTeacher from './../hooks/useTeacher';
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  const [isStudent] = useStudent();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-xl text-blue-300">
          {isSidebarOpen ? <FaTimes  /> : <FaBars />}
        </button>
      </div>

      
      <div
        className={`w-64 min-h-screen bg-orange-400 fixed md:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/teacher-req">
                  <FaChalkboardTeacher />
                  Teacher Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allclass">
                  <FaUsers /> AllClasses
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <IoMdBookmarks />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUser />
                  Profile
                </NavLink>
              </li>
            </>
          ) : isTeacher ? (
            <>
              <li>
                <NavLink to="/dashboard/myclass">
                  <IoMdBookmarks />
                  My Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addclass">
                  <FaBook />
                  Add Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUser />
                  Profile
                </NavLink>
              </li>
            </>
          ) : isStudent ? (
            <>
              <li>
                <NavLink to="/dashboard/myenrolledclass">
                  <IoMdBookmarks />
                  My Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUser />
                  Profile
                </NavLink>
              </li>
            </>
          ) : null}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
        </ul>
      </div>

     
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;