import { useState, useEffect, useRef } from 'react';
import {
  addWorkout,
  getWorkouts,
  deleteWorkout,
} from '../api/workoutLogger.js';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const WorkoutLogger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addWorkout(formData);

      if (response && response.workout) {
        setWorkouts((prevWorkouts) => [...prevWorkouts, response.workout]);
        setFormData({ type: '', duration: '', calories: '' });
        closeModal();
      } else {
        console.error('Unexpected response format:', response);
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
      const response = await getWorkouts();

      if (response && response.data && Array.isArray(response.data)) {
        setWorkouts(response.data);
      } else {
        console.warn('Unexpected response format:', response);
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
      await deleteWorkout(workoutId);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== workoutId)
      );
    } catch (error) {
      console.error('Error deleting workout:', error.message);
    }
  };

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
                className="w-full bg-green-500 text-white py-2 px-4 rounded"
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

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Workout History</h2>
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg my-2 flex justify-between items-center"
            >
              <div>
                {workout.type} - {workout.duration} mins - {workout.calories}{' '}
                calories
              </div>
              <div className="flex items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 flex items-center justify-center">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
                  onClick={() => handleDelete(workout._id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutLogger;
