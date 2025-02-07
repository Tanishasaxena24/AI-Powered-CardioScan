import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      alert("Password not matched");
      return;
    }
    const url = "http://localhost:3000/api/users";
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });

    const data = await response.json();
    if (data.client) {
      localStorage.setItem('client', data.client);
      alert(data.message);
      navigate('/');
    } else {
      alert(data.error);
    }
  };

  const onHandleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen ">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img className="max-h-[80vh] object-contain" src="auth.png" alt="Auth Illustration" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8 ">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-950">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="name"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <div>
              <label htmlFor="prof" className="block text-gray-700 font-medium">What best defines you?</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-black" name="prof">
                <option value="Patient">Patient</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Doctor">Doctor</option>
                <option value="ECG Operator">ECG Operator</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <div>
              <label htmlFor="cpassword" className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-900 text-white font-medium py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-900"
            >
              Signup
            </button>
            <p className='mt-5 text-center'>
              Already a user?
              <Link to='/loginsignup' className='text-pink-950 font-semibold p-2'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
