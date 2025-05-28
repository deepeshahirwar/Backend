import React, { useState } from 'react';

import { RouteSingUp } from '@/helpers/RouteNames';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
 

import { toast } from 'react-toastify'; 

const SignIn = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👈 visibility state

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email or phone is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Sign in successful:', formData); 
      toast.success('Sign in successful!'); // Show success message
      // Proceed with login logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google"
            className="h-8"
          />
        </div>

        <h2 className="text-2xl font-medium text-gray-800 text-center mb-2">Sign in</h2>
        <p className="text-sm text-gray-600 text-center mb-6">to continue to YourApp</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or phone"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field with Toggle */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <button type="button" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-6">
          Not your computer? Use Guest mode to sign in privately.{' '}
          <button className="text-blue-600 hover:underline">Learn more</button>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to={RouteSingUp}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Create New Account.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
