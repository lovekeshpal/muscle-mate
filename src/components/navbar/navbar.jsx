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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className="flex justify-between items-center p-4  dark:bg-gray-800 h-20  shadow-md">
        <div className="w-full flex justify-between dark:bg-gray-800">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-xl mr-2 ml-5 font-bold text-gray-900 dark:text-white"
            >
              <span class="material-symbols-outlined hover-effect">menu</span>
            </button>
            <Link
              to="/"
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
              <span className="mr-5 text-sm font-bold text-gray-900 dark:text-gray-300">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
              <div
                className={`relative w-11 h-6 ${
                  theme === "light" ? "bg-black" : "bg-gray-200"
                } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] ${
                  theme === "light" ? "after:bg-white" : "after:bg-black"
                } after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
              ></div>
            </label>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } h-full w-64 bg-gray-100 dark:bg-black transition-all`}
      >
        <div className="flex items-center p-4  bg-white  dark:bg-gray-800 h-20  shadow-md">
          <button
            onClick={toggleSidebar}
            className="text-xl mr-2 ml-5 font-bold text-gray-900 dark:text-white"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Muscle Mate
          </span>
        </div>
        <div className="p-5">
          <Link
            onClick={toggleSidebar}
            to="/"
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
