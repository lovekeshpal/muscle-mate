import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className="flex justify-between items-center p-4 dark:bg-customDark h-20 dark:border-b border-gray-600 shadow-md">
        <div className="w-full flex justify-between dark:bg-customDark">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-xl mr-2 font-bold text-gray-900 dark:text-white"
            >
              <span className="material-symbols-outlined hover-effect">
                menu
              </span>
            </button>
            <Link
              to="/home"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              Muscle Mate
            </Link>
          </div>
          <div className="flex justify-end">
            {/* Sun Icon - Click to set theme to light */}
            {theme === "dark" && (
              <button
                onClick={toggleTheme}
                className="material-symbols-outlined hover-effect"
                style={{ color: "white" }}
              >
                light_mode
              </button>
            )}

            {/* Moon Icon - Click to set theme to dark */}
            {theme === "light" && (
              <button
                onClick={toggleTheme}
                className="material-symbols-outlined hover-effect"
                style={{ color: "black" }}
              >
                dark_mode
              </button>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } h-full w-64 bg-gray-100 dark:bg-customDark transition-all`}
      >
        <div className="flex items-center p-4  bg-white  dark:bg-customDark h-20 dark:border-b border-gray-600">
          <button
            onClick={toggleSidebar}
            className="text-xl mr-2 font-bold text-gray-900 dark:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Muscle Mate
          </span>
        </div>
        <div className="p-5 dark:border-r border-gray-600 min-h-screen flex flex-col">
          <Link
            onClick={toggleSidebar}
            to="/home"
            className="flex items-center text-black dark:text-white py-2"
          >
            <span className="material-symbols-outlined mr-2">home</span>
            <span >Home</span>
          </Link>
          <Link
            onClick={toggleSidebar}
            to="/profile"
            className="flex items-center text-black dark:text-white py-2"
          >
            <span className="material-symbols-outlined mr-2">person</span>
            <span >Profile</span>
          </Link>
          <Link
            onClick={toggleSidebar}
            className="flex items-center text-black dark:text-white py-2"
          >
            <span className="material-symbols-outlined mr-2">logout</span>
            <span >Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
