import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signup } from '../../api/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(''); // Error state for any issues
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await signup({
        email: formData.email,
        username: formData.username.toLowerCase(),
        password: formData.password,
      });

      console.log('Signup successful:', response);
      setError(''); // Clear previous errors

      // Redirect to login page after successful signup
      navigate('/home');
    } catch (err) {
      console.error('Signup error:', err.message);
      setError(err.message); // Set error message from the signup function
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="flex items-center justify-center bg-white dark:bg-customDark py-8">
      <div className="bg-white dark:bg-customDark p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-3 px-4 text-black dark:text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-3 px-4 text-black dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-3 px-4 text-black dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow-md appearance-none border rounded w-full py-3 px-4 text-black dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create an Account
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
