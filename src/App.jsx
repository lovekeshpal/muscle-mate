import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Profile from './components/profile/profile';
import PrivateRoute from './components/PrivateRoute';
import WorkoutLogger from './components/WorkoutLogger';

console.log(`Current environment mode: ${import.meta.env.MODE}`);

const App = () => {
  const parent = {
    maxWidth: '1200px', // Default to desktop max-width
    margin: '0 auto', // Center the navbar
    padding: '1rem', // Add some padding
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-customDark">
        <Navbar />
        <div style={parent}>
          {/* Setup Routes */}
          <Routes>
            {/* Default route to redirect to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={<PrivateRoute element={Profile} />}
            />
            <Route path="/workoutlogger" element={<WorkoutLogger />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
