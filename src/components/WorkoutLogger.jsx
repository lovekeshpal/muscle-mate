import { useState, useEffect, useRef } from 'react';
import { addWorkout, getWorkouts } from '../api/workoutLogger.js';

const WorkoutLogger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    calories: '',
  });
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addWorkout(formData);

      if (response && Array.isArray(response.workouts)) {
        setWorkouts(response.workouts); // Assuming response contains an array of workouts
        setFormData({ type: '', duration: '', calories: '' });
        closeModal();
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error adding workout:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch workouts when the component mounts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts = await getWorkouts();
        console.log(fetchedWorkouts);
        if (Array.isArray(fetchedWorkouts)) {
          setWorkouts(fetchedWorkouts);
        } else {
          console.error('Fetched workouts is not an array:', fetchedWorkouts);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error.message);
      }
    };

    fetchWorkouts();
  }, [workouts]);

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-customDark text-gray-900 dark:text-gray-100">
      <button
        onClick={openModal}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        + Log Workout
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClickOutside}
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            ref={modalRef}
          >
            <h2 className="text-2xl font-bold mb-4">Log Your Workout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                Workout Type:
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </label>

              <label className="block">
                Duration (minutes):
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </label>

              <label className="block">
                Calories Burned:
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </label>

              <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 rounded ${
                  loading && 'opacity-50 cursor-not-allowed'
                }`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Logged Workouts:</h3>
        {Array.isArray(workouts) && workouts.length > 0 ? (
          <ul className="space-y-2">
            {workouts.map((workout, index) => (
              <li key={index} className="p-4 border border-gray-300">
                <p>Type: {workout.type}</p>
                <p>Duration: {workout.duration} minutes</p>
                <p>Calories Burned: {workout.calories}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutLogger;
