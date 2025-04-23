// Import necessary dependencies from React and React Router
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login component for handling user authentication
const Login = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // State variables to store user input
  const [identifier, setIdentifier] = useState(""); // Stores either username or email
  const [password, setPassword] = useState(""); // Stores user password

  // Handler function for form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate if all required fields are filled
    if (!identifier || !password) {
      alert("Please enter all the details.");
      return;
    }

    // Check if identifier is an email and validate its format
    const isEmail = identifier.includes("@");
    if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      alert("Please enter a valid email address.");
      return;
    }

    //API CALL HERE

    try {
      // Make API call to backend for authentication
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }), // Send credentials to server
      });

      const result = await response.json();

      // Handle successful login
      if (result.success) {
        // Store user data in localStorage for persistent session
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.user.username);
        localStorage.setItem("userid", result.user.id);
        if (result.user.personality) {
          localStorage.setItem("personality", result.user.personality);
        }
        localStorage.setItem("isAuthenticated", true);
        navigate("/home"); // Redirect to home page after successful login
      } else {
        // Display error message if login fails
        alert(result.message || "Invalid credentials");
      }
    } catch (err) {
      // Handle any network or server errors
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    // Main container with background image and centering
    <div className="min-h-screen flex items-center justify-center bg-[url('/login-background.jpg')] bg-cover bg-center bg-no-repeat relative px-4 text-white">
      {/* Login form card */}
      <div className="relative bg-white text-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md z-10">
        {/* Login form header */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to Get - Away
        </h2>
        {/* Login form with input fields */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Username/Email input field */}
          <div>
            <label
              htmlFor="identifier"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter username or email"
              required
            />
          </div>
          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mt-4 r text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="text-[#D2691E] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-[#D2691E] text-white py-2 rounded-lg font-semibold hover:bg-[#A0522D] transition"
          >
            Login
          </button>
        </form>
        {/* Divider */}
        <div className="text-center text-gray-500 mt-4">or</div>
        {/* Google Sign-in button */}
        <button
          type="button"
          onClick={() => {}}
          className="w-full border border-gray-300 py-2 my-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
        {/* Forgot password link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <Link
            to="/forgot-password"
            className="text-[#D2691E] hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        {/* Sign up link for new users */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#D2691E] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Export the Login component for use in other parts of the application
export default Login;
