import { useState } from 'react';
import Calendar from 'react-calendar';
import { Line, Doughnut } from 'react-chartjs-2';
import { FaHeart, FaBurn, FaRunning, FaAppleAlt, FaTint } from 'react-icons/fa';
import { BiMoon } from 'react-icons/bi';
import 'react-calendar/dist/Calendar.css';
import 'chart.js/auto';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const userName = 'Yasowant';
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  // Metric Data Section
  const metrics = [
    {
      id: 1,
      icon: <FaHeart className="text-red-500 text-3xl" />,
      value: '110 bpm',
      label: 'Heart Rate',
    },
    {
      id: 2,
      icon: <FaBurn className="text-orange-500 text-3xl" />,
      value: '250 kcal',
      label: 'Calories Burned',
    },
    {
      id: 3,
      icon: <FaRunning className="text-green-500 text-3xl" />,
      value: '5.2 km',
      label: 'Running Distance',
    },
    {
      id: 4,
      icon: <BiMoon className="text-purple-500 text-3xl" />,
      value: '8 hrs',
      label: 'Sleep Duration',
    },
    {
      id: 5,
      icon: <FaAppleAlt className="text-yellow-500 text-3xl" />,
      value: '3 Servings',
      label: 'Fruits Eaten',
    },
    {
      id: 6,
      icon: <FaTint className="text-blue-500 text-3xl" />,
      value: '2.5 Liters',
      label: 'Water Intake',
    },
  ];

  // Scheduled Section Data
  const scheduledActivities = [
    { id: 1, type: 'Fitness', activity: 'Training Yoga Class', date: '22 Apr' },
    { id: 2, type: 'Cardio', activity: 'Training Swimming', date: '28 Apr' },
  ];

  // Line Chart Data
  const activityData = {
    labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    datasets: [
      {
        label: 'Activity',
        data: [20, 40, 60, 50, 80, 30, 70],
        borderColor: '#805AD5',
        backgroundColor: 'rgba(128, 90, 213, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#805AD5',
      },
    ],
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ['Stretching', 'Crossfit', 'Yoga'],
    datasets: [
      {
        label: 'Today Overview',
        data: [25, 40, 55],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 bg-white dark:bg-customDark">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-gray-200 p-6 rounded-lg shadow-lg mb-8 md:mb-0 dark:bg-customDark">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Profile
          </h2>
          {/* Profile Image */}
          <div className="mt-4 flex justify-center">
            <img
              src="/main.jpg"
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
          </div>
          {/* User Details */}
          <div className="text-center mt-4">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Yasowant
            </h1>
            <p className="text-gray-600 dark:text-gray-400">@yasowant</p>
          </div>
          {/* Additional Info */}
          <div className="mt-6 flex justify-between text-center">
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                65 kg
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                178 cm
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                25
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
            </div>
          </div>
          <div className="mt-6 ">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Calendar
            </h2>
            <Calendar
              onChange={setDate}
              value={date}
              className="mt-4 rounded-lg shadow-md  bg-white  dark:text-black"
            />
          </div>
        </div>

        {/* Right Profile Content */}
        <div className="md:w-3/4 ml-0 md:ml-6">
          {/* Header Section */}
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Welcome, <span className="text-purple-600">{userName}</span>!{' '}
            {greeting}
          </h1>

          {/* Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="flex items-center justify-between p-6 bg-white shadow-lg rounded-lg border dark:bg-customDark border-gray-200"
              >
                <div>{metric.icon}</div>
                <div className="text-right dark:text-white">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <p className="text-gray-500 dark:text-white">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scheduled Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Scheduled
            </h2>
            <div className="space-y-4">
              {scheduledActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-6 bg-white shadow-lg rounded-lg border dark:bg-customDark border-gray-200 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white">
                      {activity.type}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {activity.activity}
                    </p>
                  </div>
                  <p className="text-gray-500 dark:text-white">
                    {activity.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Line Chart Card */}
            <div className="bg-white p-4 rounded-lg shadow-lg border dark:bg-customDark h-64">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Activity Progress
              </h2>
              <Line data={activityData} />
            </div>

            {/* Doughnut Chart Card */}
            <div className="bg-white p-4 rounded-lg shadow-lg border flex flex-col items-center justify-center dark:bg-customDark h-64">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Today's Overview
              </h2>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
