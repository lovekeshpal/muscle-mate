import { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Home = () => {
  const images = ['/main.jpg', '/main2.jpg', '/main3.jpg'];

  const taglines = [
    'Achieve Your Fitness Goals',
    'Push Your Limits with Muscle Mate',
    'Transform Your Body, Transform Your Life',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Set interval to change images and taglines automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-customDark overflow-hidden">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-center py-20 transition-all"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black bg-opacity-40 py-20">
          <div className="container mx-auto px-4">
            {/* Scrolling effect for the tagline */}
            <div className="text-4xl font-bold text-white dark:text-gray-100 mb-4">
              {/* Tagline with animation */}
              <div className="marquee-animation">{taglines[currentIndex]}</div>
            </div>

            <h1 className="text-white dark:text-gray-300 mb-8">
              Track your progress, manage your workouts, and stay motivated with
              Muscle Mate.
            </h1>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-customDark">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
              <img
                src="/workouttracking.jpg" // Image path for Workout Tracking
                alt="Workout Tracking feature"
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Workout Tracking
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                Log your workouts and monitor your progress with ease.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
              <img
                src="/personalizedPlan.jpg" // Image path for Personalized Plans
                alt="Personalized Plans feature"
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Personalized Plans
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                Create custom workout plans tailored to your goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
              <img
                src="/progressreport.jpg" // Image path for Progress Reports
                alt="Progress Reports feature"
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Progress Reports
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                View detailed stats and charts of your performance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
              <img
                src="nutraiontracking.jpg" // Image path for Nutrition Tracking
                alt="Nutrition Tracking feature"
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Nutrition Tracking
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                Keep track of your calorie intake and nutrition macros to
                complement your fitness journey.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
              <img
                src="/communitysupport.jpg" // Image path for Community Support
                alt="Community Support feature"
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Community Support
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                Connect with other fitness enthusiasts to share tips and
                motivate each other.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
              <img
                src="/goal.jpg" // Image path for Goal Setting
                alt="Goal Setting feature"
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Goal Setting
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                Define and track fitness goals, whether it's weight loss, muscle
                gain, or endurance improvement.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Fitness Journey?
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Join Muscle Mate and unlock all the tools you need to achieve your
              fitness goals.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900">
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white dark:bg-customDark overflow-hidden text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo, Address, and Socials */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">
              Muscle Mate
            </h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Muscle Mate is a platform where you can communicate with friends
              and share moments with built-in features.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Address: 123 Fitness Rourkela, FitCity, Odisha
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 text-2xl">
              <a
                href="#"
                aria-label="Instagram"
                className="text-pink-500 hover:text-pink-400"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-blue-400 hover:text-blue-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-blue-600 hover:text-blue-500"
              >
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* Company Links aligned right */}
          <div className="text-right">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Company
            </h3>
            <ul className="flex flex-col items-end space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  Product Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Insights aligned right */}
          <div className="text-right">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Get In Touch
            </h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  Support
                </a>
              </li>
            </ul>
            <h3 className="text-lg font-bold mt-6 mb-4 text-gray-800 dark:text-white">
              Insights
            </h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                >
                  Case Studies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-8 border-t border-gray-700 pt-6 text-gray-400 text-sm dark:text-gray-300">
          © 2025 Muscle Mate | All rights reserved.
          <a
            href="#"
            className="ml-4 hover:text-white dark:hover:text-gray-200"
          >
            Terms & Conditions
          </a>
          <a
            href="#"
            className="ml-4 hover:text-white dark:hover:text-gray-200"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
