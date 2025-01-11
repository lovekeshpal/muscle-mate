const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login function
export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Return a specific error based on the response status
      if (response.status === 400) {
        throw new Error("Please enter valid email/username and password.");
      } else if (response.status === 401) {
        throw new Error("Incorrect email/username or password.");
      } else if (response.status === 404) {
        throw new Error("User does not exist. Please sign up.");
      } else {
        throw new Error(errorText || "Login failed. Please try again later.");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error(
      error.message || "An unexpected error occurred during login."
    );
  }
};

// Signup function
export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Signup failed. Please try again later.");
    }

    // Parse the response as JSON
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error during signup:", error.message);
    throw new Error(
      error.message || "An unexpected error occurred during signup."
    );
  }
};

// Logout function
export const logout = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token")); // Assuming the user object is saved in localStorage

    // Check if the token exists
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    // Make the logout API request with the token
    const response = await fetch(`${BASE_URL}/api/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use the token from the user object
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Logout failed. Please try again later.");
    }

    // If the API responds successfully, remove the token and user data
    localStorage.removeItem("token");
    console.log("Logout successful");
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw new Error(
      error.message || "An unexpected error occurred during logout."
    );
  }
};
