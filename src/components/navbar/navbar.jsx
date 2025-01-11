import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../api/auth';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { logout: contextLogout } = useContext(AuthContext);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      // Close the sidebar on logout
      setIsSidebarOpen(false);

      // Call the logout API first
      await logout(); // Perform the logout API request

      // Update the context
      contextLogout();

      // After successful logout, redirect to the login page
      navigate('/login'); // Redirect to the login page after logout
    } catch (err) {
      console.error('Error during logout:', err);
      // Handle error if needed (like showing a message to the user)
    }
  };

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
            {theme === 'dark' && (
              <button
                onClick={toggleTheme}
                className="material-symbols-outlined hover-effect"
                style={{ color: 'white' }}
              >
                light_mode
              </button>
            )}

            {/* Moon Icon - Click to set theme to dark */}
            {theme === 'light' && (
              <button
                onClick={toggleTheme}
                className="material-symbols-outlined hover-effect"
                style={{ color: 'black' }}
              >
                dark_mode
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          isSidebarOpen ? 'left-0' : '-left-full'
        } h-full w-64 bg-gray-100 dark:bg-customDark transition-all`}
      >
        <div className="flex items-center p-4 bg-white dark:bg-customDark h-20 dark:border-b border-gray-600">
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
            <span>Home</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                onClick={toggleSidebar}
                to="/profile"
                className="flex items-center text-black dark:text-white py-2"
              >
                <span className="material-symbols-outlined mr-2">person</span>
                <span>Profile</span>
              </Link>
              <div className="flex items-center text-black dark:text-white py-2 cursor-pointer">
                <span className="material-symbols-outlined mr-2">logout</span>
                <span onClick={handleLogout}>Logout</span>
              </div>
            </>
          )}
{!isAuthenticated && (
            <>
              <Link
                onClick={toggleSidebar}
                to="/login"
                className="flex items-center text-black dark:text-white py-2"
              >
                <span className="material-symbols-outlined mr-2">login</span>
                <span>Login</span>
              </Link>
              <Link
                onClick={toggleSidebar}
                to="/signup"
                className="flex items-center text-black dark:text-white py-2"
              >
                <span className="material-symbols-outlined mr-2">app_registration</span>
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
