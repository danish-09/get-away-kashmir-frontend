// Import necessary dependencies for form handling and navigation
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import RangeSelector from "../components/RangeSelector";

// PersonalityTestPage component - Handles personality assessment questionnaire
const PersonalityTestPage = () => {
  // State for storing user's answers
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate(); // Navigation utility

  // Array of personality assessment questions
  const questions = [
    "Questions goes here.",
    "Questions goes here.",
    "Questions goes here.",
    "Questions goes here..",
    "Questions goes here.",
    "Questions goes here.",
    "Questions goes here..",
    "Questions goes here..",
    "Questions goes here.",
    "Questions goes here.",
  ];

  // Handler for updating answers when user interacts with range selector
  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
    console.log("answers :   ", answers);
  };

  // Form submission handler
  // Saves test results and navigates back
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit :   ", answers);

    try {
      // API integration placeholder
      // Simulate API call to submit personality test
      // const response = await fetch('/api/personality-test', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({ answers })
      // });
      // const data = await response.json();

      // Save results to localStorage
      // Mark test as completed in local storage
      localStorage.setItem("personalityTaken", true);

      // Return to previous page
      navigate(-1);
    } catch (error) {
      console.error("Error submitting personality test:", error);
      alert("Failed to submit test. Please try again.");
    }
  };

  // UI Structure:
  // - Centered container with white background
  // - Title section
  // - Form with questions and range selectors
  // - Submit button
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-center text-[#78350f] mb-6">
        Personality Test
      </h1>

      {/* Test form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Map through questions to create form fields */}
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            {/* Question text */}
            <p className="font-medium text-gray-800">
              {index + 1}. {question}
            </p>
            {/* Range selector component */}
            <div className="flex flex-row gap-4">
              <RangeSelector index={index} handleChange={handleAnswerChange} />
            </div>
          </div>
        ))}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#d97706] text-white py-3 rounded-lg hover:bg-[#b45309] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalityTestPage;
