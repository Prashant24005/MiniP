import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // For navigation

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Track user type
  const [pgLocation, setPgLocation] = useState(''); // PG location
  const [distanceFromCollege, setDistanceFromCollege] = useState(''); // Distance from college
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccessMessage('');

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Ensure the landlord details are provided when userType is 'landlord'
    if (userType === 'landlord' && (!pgLocation || !distanceFromCollege)) {
      setError('Please provide PG location and distance from college.');
      return;
    }

    try {
      const response = await fetch('https://server-o15m.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          userType,
          pgLocation, // Add PG location if userType is landlord
          distanceFromCollege, // Add distance from college if userType is landlord
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message and redirect to login
        setSuccessMessage('Signup successful! Redirecting to login...');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUserType('student');
        setPgLocation(''); // Reset PG location
        setDistanceFromCollege(''); // Reset distance from college
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* User Type Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Register As</label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={userType === 'student'}
                  onChange={() => setUserType('student')}
                  className="form-radio"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="landlord"
                  checked={userType === 'landlord'}
                  onChange={() => setUserType('landlord')}
                  className="form-radio"
                />
                <span>Landlord/Accommodator</span>
              </label>
            </div>
          </div>

          {/* PG Location Field (only visible for landlords) */}
          {userType === 'landlord' && (
            <div>
              <label htmlFor="pgLocation" className="block text-sm font-medium text-gray-700 mb-2">
                PG Location
              </label>
              <input
                id="pgLocation"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                value={pgLocation}
                onChange={(e) => setPgLocation(e.target.value)}
                required
              />
            </div>
          )}

          {/* Distance from College Field (only visible for landlords) */}
          {userType === 'landlord' && (
            <div>
              <label htmlFor="distanceFromCollege" className="block text-sm font-medium text-gray-700 mb-2">
                Distance from College (in kilometers)
              </label>
              <input
                id="distanceFromCollege"
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                value={distanceFromCollege}
                onChange={(e) => setDistanceFromCollege(e.target.value)}
                required
              />
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Success Message */}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
