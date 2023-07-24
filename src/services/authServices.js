export async function signIn(username, password) {
  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return response.json();
    } else {
      console.error("Login failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}
export async function signUp(register) {
  try {
    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    });
    if (response.ok) {
      return response.json();
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration. Please try again later.");
  }
}
