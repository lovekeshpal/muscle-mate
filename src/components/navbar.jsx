// Import React hooks
import React, { useState, useEffect } from "react";

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

  const navbarStyle = {
    maxWidth: "1200px", // Default to desktop max-width
    margin: "0 auto", // Center the navbar
    padding: "1rem", // Add some padding
  };

  return (
    <nav className="flex justify-between items-center p-4  dark:bg-gray-800 h-20">
      <div
        style={navbarStyle}
        className="w-full flex justify-between  dark:bg-gray-800"
      >
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Muscle Mate
          </span>
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
  );
};

export default Navbar;
