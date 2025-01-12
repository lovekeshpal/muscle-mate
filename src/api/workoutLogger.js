const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addWorkout = async (workoutData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/workout/addworkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      throw new Error('Failed to add workout');
    }

    const data = await response.json();
    console.log(data, 'workout data');

    return data;
  } catch (error) {
    console.error('Error during adding workout:', error.message);
    throw error; // Optional, depending on whether you want to propagate the error
  }
};

export const getWorkouts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/workout/getworkouts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error during fetching workouts:', error.message);
    throw error;
  }
};
