import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  //hook for navigation
  const navigate = useNavigate();

  //state for data it is an object with the required fields
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    dob: "",
    gender: "",
    password: "",
    test: "",
  });

  // Inside your Signup component
  useEffect(() => {
    const personalityTaken =
      localStorage.getItem("personalitytaken") === "true";
    if (personalityTaken) {
      setFormData((prev) => ({ ...prev, test: "yes" }));
    }
  }, []);

  const [errors, setErrors] = useState({});

  /*this function take a name and a value from the input field
  if you look at the input fields it has a property name which is same to name of key inside the 
    formdata state 

  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    //when we use useState we can get the previous state of the object as well
    //here i take the previous state spread which means copying the old values
    //then [name] : value will change the specific value in the formdata object
    // this mean example i am typing the fullname the input field has a property fullname
    // so all the other fields will be copied as it is but the fullname will be replaced with value entered in the fullname input field
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    //basic regex for validation btw regex means regular expression so it is from the compiler design calss
    const usernameRegex = /^(?=.*[\d_])[a-zA-Z\d_]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //these are errors thrown when we submit the form
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!usernameRegex.test(formData.username))
      newErrors.username =
        "Username can only contain letters, numbers, and underscores, and must include at least one number or underscore";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    // if there is no error then call the api
    if (Object.keys(newErrors).length === 0) {
      //API CALL HERE
      //wrapping the api call in try catch because it can through error
      try {
        //post call to the backend replace /api/signup with your actual url
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        });

        const result = await response.json();

        // result={
        //   success:true,
        //   user:{
        //     username,
        //     personality,
        //     token
        //   }
        // }

        //set the local storage variables so that they are available around the whole app
        if (result.success) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", result.user.username);
          if (result.user.personality) {
            localStorage.setItem("personality", result.user.personality);
          }
          localStorage.setItem("isAuthenticated", true);
          navigate("/home");
        } else {
          alert(result.message || "Invalid credentials");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  //this is just navigation to the personality test page

  const handlePersonalitySelectChange = (e) => {
    const value = e.target.value;
    if (value === "yes") {
      navigate("/personality-test");
    }
    handleChange(e);
  };
  //add logic for google signup
  const handleGoogleSignup = () => {
    alert("Redirect to Google signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/signup-background.jpg')] bg-cover bg-center bg-no-repeat relative px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#D97706]">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. John Doe"
              className={`w-full border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#D97706]`}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="e.g. john_doe1"
              className={`w-full border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#D97706]`}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#D97706]`}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className={`w-full border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              } px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#D97706]`}
              onChange={handleChange}
              required
            />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              className={`w-full border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#D97706]`}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="e.g. strongpassword123"
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#D97706]`}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Personality Test */}
          <div className="space-y-1">
            <label className="block font-medium text-gray-700">
              Take a personality test?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="test"
                  value="yes"
                  onChange={handlePersonalitySelectChange}
                  checked={formData.test === "yes"}
                  required
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="test"
                  value="later"
                  onChange={handlePersonalitySelectChange}
                  required
                  checked={formData.test === "later"}
                />
                Maybe later
              </label>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#D97706] text-white py-2 rounded-lg hover:bg-[#B45309] transition"
          >
            Register
          </button>

          {/* Google Sign Up */}
          <div className="text-center text-gray-500">or</div>
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#D97706] hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
