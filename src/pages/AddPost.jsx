// Import necessary React hooks and routing utilities
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// AddPost component - Handles creation of new trip posts with images and details
const AddPost = () => {
  // Authentication token retrieval is commented out for now
  // const token = localStorage.getItem("token");

  // State management for form data
  const [title, setTitle] = useState(""); // For trip title
  const [images, setImages] = useState([]); // Array to store image preview URLs
  const [location, setLocation] = useState(""); // For trip location
  const [description, setDescription] = useState(""); // For detailed trip description
  const [visitDate, setVisitDate] = useState(""); // For when the trip occurred
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handles image file selection and preview generation
  // Creates object URLs for selected images to show previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const previews = files.map((file) => URL.createObjectURL(file)); // Create preview URLs
    setImages(previews);
  };

  // Form submission handler
  // Creates a new post object and would typically send it to an API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create new post object with form data
    const newPost = {
      title,
      images,
      location,
      description,
      visitDate,
      createdAt: new Date().toISOString(), // Add timestamp
    };

    console.log("Post added:", newPost);

    //API CALL HERE

    // API call commented out - would send post data to backend
    // try {
    //   const response = await fetch("/api/add-post", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //           "token":token,
    //     },
    //     body: JSON.stringify({ post: newPost }),
    //   });

    //   const result = await response.json();

    //   if (result.success) {
    //     setTitle("");
    //     setImages([]);
    //     setLocation("");
    //     setDescription("");
    //     setVisitDate("");
    //     alert("Post added successfully!");
    //     navigate("/home");
    //   } else {
    //     alert(result.message || "Invalid credentials");
    //   }
    // } catch (err) {
    //   console.error("Login error:", err);
    //   alert("Something went wrong. Please try again.");
    // }

    // Reset form fields after submission
    setTitle("");
    setImages([]);
    setLocation("");
    setDescription("");
    setVisitDate("");
    alert("Post added successfully!");
    navigate("/home"); // Redirect to home page
  };

  // UI Structure:
  // - Main container with centered content and shadow
  // - Form with multiple input sections:
  //   1. Title input
  //   2. Image upload with preview
  //   3. Location input
  //   4. Visit date picker
  //   5. Description textarea
  //   6. Submit button
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      {/* Form title with styling */}
      <h1 className="text-2xl font-bold mb-6 text-amber-700">
        Create a New Trip
      </h1>

      {/* Form with Tailwind styling for consistent spacing */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title input with label and styling */}
        <div>
          <label className="block text-amber-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Trip to Sonamarg"
            required
          />
        </div>

        {/* Image upload section with preview grid */}
        <div>
          <label className="block text-amber-700 mb-2">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-amber-300 rounded-lg px-4 py-2 text-gray-700 file:bg-amber-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
          />
          {/* Image preview grid */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`preview-${index}`}
                  className="rounded-lg h-24 w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Location input field with validation */}
        <div>
          <label className="block text-amber-700 mb-2">Location</label>
          <input
            type="text"
            className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Gulmarg, Kashmir"
            required
          />
        </div>

        {/* Date picker for visit date */}
        <div>
          <label className="block text-amber-700 mb-2">Visit Date</label>
          <input
            type="date"
            className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
          />
        </div>

        {/* Multi-line description textarea */}
        <div>
          <label className="block text-amber-700 mb-2">Description</label>
          <textarea
            className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your trip details..."
            required
          ></textarea>
        </div>

        {/* Submit button with hover effects */}
        <button
          type="submit"
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
