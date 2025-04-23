// Import necessary dependencies for state management and routing
import React, { useState } from "react";
import { Link } from "react-router-dom";

// ForgotPassword component - Handles password reset flow with email and OTP verification
const ForgotPassword = () => {
  // State management for form fields and UI control
  const [email, setEmail] = useState(""); // Store user email
  const [message, setMessage] = useState(""); // Display status messages
  const [otpSent, setOtpSent] = useState(false); // Toggle between email and OTP forms
  const [otp, setOtp] = useState(""); // Store OTP input
  const [newPassword, setNewPassword] = useState(""); // Store new password
  const [repeatPassword, setRepeatPassword] = useState(""); // Confirm new password

  // Handle email submission and OTP generation
  // Validates email format and triggers OTP sending process
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    setMessage("Sending OTP...");

    try {
      //API CALL HERE
      // Simulated API call to send OTP
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await response.json();

      // Simulate successful OTP send
      setOtpSent(true);
      setMessage("OTP has been sent to your email.");
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
      console.error("Error sending OTP:", error);
    }
  };

  // Handle password reset after OTP verification
  // Validates OTP and updates password in the system
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !repeatPassword) {
      alert("Please fill all the fields.");
      return;
    }

    if (newPassword !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      //API CALL HERE
      // Simulated API call to verify OTP and reset password
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     otp,
      //     newPassword
      //   }),
      // });
      // const data = await response.json();

      // Simulate successful password reset
      setMessage("Password reset successfully. Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setMessage("Failed to reset password. Please try again.");
      console.error("Error resetting password:", error);
    }
  };

  // UI Structure:
  // - Full-screen background with login image
  // - Centered white card for form content
  // - Conditional rendering between email and reset forms
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/login-background.jpg')] bg-cover bg-center bg-no-repeat relative px-4 text-white">
      {/* Main form container with white background */}
      <div className="relative bg-white text-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md z-10">
        {/* Dynamic title based on current step */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {otpSent ? "Reset Password" : "Forgot Password"}
        </h2>

        {/* Conditional rendering of forms based on OTP status */}
        {!otpSent ? (
          // Email submission form
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D2691E] text-white py-2 rounded-lg font-semibold hover:bg-[#A0522D] transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          // Password reset form with OTP verification
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter OTP"
                required
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="New Password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="repeat-password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Repeat Password
              </label>
              <input
                type="password"
                id="repeat-password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Repeat Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D2691E] text-white py-2 rounded-lg font-semibold hover:bg-[#A0522D] transition"
            >
              Reset Password
            </button>
          </form>
        )}

        {/* Status message display */}
        {message && (
          <p className="text-center text-sm mt-4 text-gray-600">{message}</p>
        )}

        {/* Navigation link back to login page */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-[#D2691E] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
