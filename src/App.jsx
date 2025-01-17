import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Profile from './components/profile/profile';
import PrivateRoute from './components/PrivateRoute';
import WorkoutLogger from './components/WorkoutLogger';
import Dashboard from './components/dashboard/dashboard';

console.log(`Current environment mode: ${import.meta.env.MODE}`);

const App = () => {
  const parent = {
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '1rem',
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-customDark">
        <Navbar />
        <div style={parent}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/workoutlogger"
              element={
                <PrivateRoute>
                  <WorkoutLogger />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
