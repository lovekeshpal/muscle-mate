import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const parent = {
    maxWidth: "1200px", // Default to desktop max-width
    margin: "0 auto", // Center the navbar
    padding: "1rem", // Add some padding
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-black">
        <Navbar />
        <div style={parent}>
          {/* Setup Routes */}
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
          {/* Other components can still go here or inside specific pages */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
