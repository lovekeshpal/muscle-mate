const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addWorkout = async (workoutData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/workout/addworkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add workout');
    }

    const data = await response.json();
    console.log(data, 'Workout data successfully added');

    return data;
  } catch (error) {
    console.error('Error during adding workout:', error.message);
    throw error;
  }
};

export const getWorkouts = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/workout/getworkouts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Raw API response:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.warn(
        'API responded with an error:',
        errorData.message || 'Unknown error'
      );
      return { data: [] };
    }

    const data = await response.json();

    if (data && data.data && Array.isArray(data.data)) {
      const sortedData = data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return { data: sortedData };
    }

    if (data && data.message === 'No workouts found.') {
      console.log('No workouts found.');
      return { data: [] };
    }

    console.warn('Unexpected response format:', data);
    return { data: [] };
  } catch (error) {
    console.error('Error during fetching user workouts:', error.message);
    return { data: [] };
  }
};
