import { RouteSingIn } from '@/helpers/RouteNames';
import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
  
import { toast } from 'react-toastify'; // Import toast for notifications
import {getEnv} from '../helpers/getEnv'; // Import getEnv function to access environment variables
import { useNavigate } from 'react-router-dom';

const SignUp = () => {  

  const navigaate = useNavigate(); 

 const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [formData, setFormData] = useState({
    firstName:'',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
 
  // Sign up form validation
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (formData.firstName.length < 3) newErrors.firstName = 'First name must be at least 3 characters';
    // if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
  
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error as user types
  };

  // Handle form submission
   async function handleSubmit(value) {
    value.preventDefault();
    if (validate()) {
      console.log('Sign Up Success:', formData); 
    //  toast.success('SignUp Successfully !')
      // Submit the form data to backend here
    }  


    try {
      console.log(getEnv('VITE_API_BASE_URL'));
      
      const response = await 
      fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Sign Up Response:', data);
      toast.success('SignUp Successfully !')
      
      // Reset form after successful sign up
      setFormData({
        firstName:'',
        email: '',
        password: '', 
        confirmPassword: ''
        
      });
      setErrors({}); 
       
      navigaate(RouteSingIn); // Redirect to Sign In page after successful sign up
    } catch (error) {
      console.error('Error during sign up:', error);
      toast.error('SignUp Failed !')
      
    }

  }; 

  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <div className="flex justify-center mb-6">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google"
            className="h-8"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">Create your account</h2>
        <p className="text-sm text-gray-600 text-center mb-6">to continue to YourApp</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="User name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* password field */}

          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Conform password */}


          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            to={RouteSingIn}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
