import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

console.log(`Current environment mode: ${import.meta.env.MODE}`);

const App = () => {
  const parent = {
    maxWidth: "1200px", // Default to desktop max-width
    margin: "0 auto", // Center the navbar
    padding: "1rem", // Add some padding
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-customDark">
        <Navbar />
        <div style={parent}>
          {/* Setup Routes */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          {/* Other components can still go here or inside specific pages */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
