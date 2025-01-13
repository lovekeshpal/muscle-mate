import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Profile from './components/profile/profile';
import PrivateRoute from './components/PrivateRoute';
import WorkoutLogger from './components/WorkoutLogger';

console.log(`Current environment mode: ${import.meta.env.MODE}`);

const App = () => {
  const parent = {
    maxWidth: '1200px',
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
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route path="/workoutlogger" element={<WorkoutLogger />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
