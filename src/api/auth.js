const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken); // Store the token in localStorage
  return data;
};

export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Signup failed');
    }

    // Parse the response as JSON
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error during signup:', error.message);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
