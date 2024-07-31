export const login = async (credentials) => {
  const response = await fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken); // Store the token in localStorage
  return data;
};

export const signup = async (userData) => {
  const response = await fetch("http://localhost:4000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // Log the raw response to see what is being returned
  const text = await response.text();
  console.log("Signup response text:", text);

  // Try to parse the response as JSON
  let responseData;
  try {
    responseData = JSON.parse(text);
  } catch (error) {
    throw new Error("Failed to parse response as JSON");
  }

  if (!response.ok) {
    // Throw the specific error message returned by the API
    throw new Error(responseData.error || "Signup failed");
  }

  return responseData;
};
