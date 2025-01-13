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
    setError({ identifier: '', password: '' });

    if (!identifier) {
      setError((prevError) => ({
        ...prevError,
        identifier: 'Please enter your email or username.',
      }));
      return;
    }

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
        contextLogin(response.token);
        navigate('/home');
      } else {
        setError({
          identifier: '',
          password:
            'Invalid credentials. Please check your username/email or password.',
        });
      }
    } catch (err) {
      setError({
        identifier: '',
        password: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-50 bg-white dark:bg-customDark overflow-hidden">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-black leading-tight focus:outline-none focus:shadow-outline"
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
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              required
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 text-xs mt-4">
          Don&apos;t have an account yet?
          <Link to="/signup" className="text-blue-500">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
