import { useState, useEffect, useRef } from 'react';
import {
  addWorkout,
  getWorkouts,
  deleteWorkout,
} from '../api/workoutLogger.js';
import { TrashIcon, FireIcon, ClockIcon } from '@heroicons/react/24/outline';
import workoutTypes from '../utils/constant.js';

const WorkoutLogger = () => {
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    calories: '',
  });
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFormData((prev) => ({ ...prev, type: '' }));
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addWorkout(formData, token);
      if (response && response.workout) {
        setWorkouts((prevWorkouts) => [...prevWorkouts, response.workout]);
        setFormData({ type: '', duration: '', calories: '' });
        setSelectedCategory('');
        closeModal();
      }
    } catch (error) {
      console.error('Error adding workout:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkouts = async () => {
    setFetchLoading(true);
    setError(null);
    try {
      const response = await getWorkouts(token);
      if (response && response.data) {
        setWorkouts(response.data);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error fetching workouts:', error.message);
      setError('Failed to fetch workouts.');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDelete = async (workoutId) => {
    try {
      await deleteWorkout(workoutId, token);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== workoutId)
      );
    } catch (error) {
      console.error('Error deleting workout:', error.message);
    }
  };

  return (
    <div className="p-10 bg-white dark:bg-customDark text-gray-800 dark:text-gray-100">
      <div className="p-10 bg-white dark:bg-customDark text-gray-800 dark:text-gray-100 flex flex-col items-start">
        <h2 className="text-3xl font-semibold mb-4">
          Start Your Workout Today
        </h2>

        <p className="text-lg mb-6">
          Success is the sum of small efforts, repeated day in and day out.
        </p>

        <div className="w-full flex justify-end">
          <button
            onClick={openModal}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-6 transition duration-300"
          >
            + Log Workout
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClickOutside}
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
            ref={modalRef}
          >
            <h2 className="text-2xl font-bold mb-4">Log Your Workout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                Category:
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {Object.keys(workoutTypes).map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              {selectedCategory && (
                <label className="block">
                  Workout Type:
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleTypeChange}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700"
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    {workoutTypes[selectedCategory].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="block">
                Duration (minutes):
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleTypeChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700"
                />
              </label>
              <label className="block">
                Calories Burned:
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleTypeChange}
                  required
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
                disabled={loading}
              >
                {loading ? 'Logging...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {fetchLoading && <p>Loading workouts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {workout.type}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Logged on{' '}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {new Date(workout.createdAt).toLocaleDateString()}{' '}
                      {new Date(workout.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-sm text-blue-500">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    <span>{workout.duration} mins</span>
                  </div>
                  <div className="flex items-center text-sm text-red-500">
                    <FireIcon className="h-5 w-5 mr-1" />
                    <span>{workout.calories} cal</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onDoubleClick={() => handleDelete(workout._id)}
                    className="flex items-center justify-center bg-red-500 text-white rounded-lg px-3 py-2 hover:bg-red-600 transition-colors duration-300"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 dark:text-gray-400">
            No workouts logged yet. Click the &quot;Log Workout&quot; button to
            add your first workout.
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkoutLogger;
