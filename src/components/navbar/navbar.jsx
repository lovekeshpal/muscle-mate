// Import React hooks
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme class to body element
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className="flex justify-between items-center p-4  dark:bg-customDark h-20 dark:border-b border-gray-600 shadow-md">
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
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer border-gray-900"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <div
                className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}
              >
                {/* Sun Icon */}
                <svg
                  className={`absolute top-1/2 left-1 -translate-y-1/2 transform ${
                    theme === "dark" ? "hidden" : ""
                  } z-20`} // Increased z-index to ensure visibility
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={theme === "light" ? "black" : "white"}
                  strokeWidth={2}
                  width="20"
                  height="20"
                  style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.2))" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.364 6.364l-1.414-1.414M6.364 6.364L5 5M18 12a6 6 0 11-12 0 6 6 0 0112 0zm0 0l1.414 1.414M5 19l1.414-1.414"
                  />
                </svg>
                {/* Moon Icon */}
                <svg
                  className={`absolute top-1/2 right-1 -translate-y-1/2 transform ${
                    theme === "light" ? "hidden" : ""
                  } z-20`} // Increased z-index to ensure visibility
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={theme === "light" ? "black" : "white"}
                  strokeWidth={2}
                  width="20"
                  height="20"
                  style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              </div>
            </label>
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
            <span className="mt-1">Home</span>
          </Link>
          <Link
            onClick={toggleSidebar}
            className="flex items-center text-black dark:text-white py-2"
          >
            <span className="material-symbols-outlined mr-2">logout</span>
            <span className="mt-1">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
