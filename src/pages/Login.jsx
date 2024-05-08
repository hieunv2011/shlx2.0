import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log({ email, password });
    // Validation: Check if emal or password is empty
    if (!email && !password) {
      alert("Please enter both email and password.");
      return;
    }

    if (!email) {
      alert("Please enter a email.");
      return;
    }

    if (!password) {
      alert("Please enter a password.");
      return;
    }

    try {
      const response = await axios.post("https://jira.shlx.vn/v1/login", {
        email,
        password,
      });

      console.log("Login successful", response.data);
      //Stroring token after successful login 
      const token = response.data.access_token;
      localStorage.setItem('userToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //console.log("Token:", token); 
      
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Login failed", error);

      // Display an alert for login failure
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
