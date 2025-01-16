const Dashboard = () => {
  const userName = 'Mike'; // Replace with dynamic user data if needed
  const greeting = 'Good Morning'; // Replace or calculate greeting dynamically based on time

  return (
    <div className="min-h-screen bg-white dark:bg-customDark overflow-hidden">
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Welcome{' '}
          <span className="text-purple-600 dark:text-purple-400">
            {userName}
          </span>
          , {greeting}
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
