import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ identifier: '', password: '' });
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError({ identifier: '', password: '' });

    // Check if the identifier (email/username) is empty
    if (!identifier) {
      setError((prevError) => ({
        ...prevError,
        identifier: 'Please enter your email or username.',
      }));
      return;
    }

    // Check if the password is empty
    if (!password) {
      setError((prevError) => ({
        ...prevError,
        password: 'Please enter your password.',
      }));
      return;
    }

    try {
      const response = await login({
        username: identifier,
        email: identifier,
        password,
      });

      if (response.token) {
        // Update the context
        contextLogin(response.token);
        navigate('/home');
      } else {
        // This case should not occur if login function works correctly. Handle invalid login explicitly
        setError({
          identifier: '',
          password:
            'Invalid credentials. Please check your username/email or password.',
        });
      }
    } catch (err) {
      // Specific error handling based on the error message
      if (err.message.includes('Incorrect email/username or password')) {
        setError({
          identifier: '',
          password: 'Incorrect email/username or password. Please try again.',
        });
      } else if (err.message.includes('User not found')) {
        setError({
          identifier: '',
          password: 'User not found. Please sign up.',
        });
      } else {
        setError({
          identifier: '',
          password: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-white dark:bg-customDark">
      <div className="bg-white dark:bg-customDark p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="identifier"
            >
              Email or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="identifier"
              placeholder="Email or Username"
              required
            />
            {error.identifier && (
              <p className="text-red-500 text-xs mt-1">{error.identifier}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            New here?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
