import React, { useState } from 'react';

import { RouteSingUp, RouteIndex  } from '@/helpers/RouteNames';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
 import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify'; 
import {getEnv} from '../helpers/getEnv'
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';
import GoogleLogin from '@/components/GoogleLogin';

const SignIn = () => {  

  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👈 visibility state
  
  // login form valedation

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

  async function handleSubmit(e){
    e.preventDefault();
    if (validate()) {
      //console.log('Sign in successful:', formData); 
    //  toast.success('Sign in successful!'); 
      
      
      // User login logic here 
       try {
            console.log(getEnv('VITE_API_BASE_URL'));
            
            const response = await 
            fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
              }, 
              credentials:'include',
              body: JSON.stringify(formData),
            });
          const data = await response.json();
            if (!response.ok) { 
              return toast.error('SignIn Failed !', 'Invalid email or password');
            
            }  
 
            // set user data 
            dispatch(setUser(data.user))
      
          
            console.log('SignIn respones:', data);
            toast.success('User SignIn Successfully !')
            
            // Reset form after successful sign up
            setFormData({
              email: '',
              password: '', 
              
            });
            setErrors({}); 
             
            navigate(RouteIndex); // Redirect to Sign In page after successful sign up
          } catch (error) {
            console.error('Error during sign in:', error);
            toast.error('SignIn Failed !')
            
          }

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
  
       {/* Google sign- up */}
       <div className='mb-4 '>
        <GoogleLogin/>
       </div> 
        
        <div className="border-b border-gray-300 mb-6"></div>





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
          Don't have an account?
        </div>

        <div className="flex justify-center mt-2">
          
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
