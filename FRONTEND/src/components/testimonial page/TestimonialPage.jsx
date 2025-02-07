import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function TestimonialPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.feedback) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    // Handle form submission (send data to backend or display a success message)
    console.log('Submitted Testimonial:', formData);
    setSubmitted(true);
    
    // Optionally reset form
    setFormData({ name: '', email: '', feedback: '' });
  };

  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row w-full bg-white">
      {/* Left Side - Form Section */}
      <div className="flex flex-1 items-center justify-center md:p-0">
        <div className="text-center md:text-left md:ml-20 w-full max-w-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-900 mb-4">Share Your Experience</h2>

          {submitted ? (
            <p className="text-green-700 text-xl md:text-2xl lg:text-3xl font-semibold">Thank you for your feedback!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />

              {/* Email Field */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />

              {/* Feedback Field */}
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Write your review/feedback here..."
                rows="4"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-red-950 hover:bg-red-800 p-2 rounded-xl text-white font-semibold w-full"
              >
                Submit Testimonial
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="flex flex-1 items-center justify-center p-4 md:p-0">
        <NavLink to="">
          <img
            src="/testi.webp"
            className="object-contain max-h-96 overflow-hidden w-full md:w-auto md:mr-10 md:mt-10"
            alt="Testimonial"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default TestimonialPage;




