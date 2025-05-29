import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { getEnv } from '@/helpers/getEnv';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RouteIndex } from '@/helpers/RouteNames';
import { useDispatch } from 'react-redux'; 
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {
    const navigate = useNavigate(); 

   const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        const googleResponse = await signInWithPopup(auth, provider)
        const user = googleResponse.user
        const formData = {
            firstName: user.displayName,
            email: user.email,
            avatar: user.photoURL
        }

        // User login logic here 
        try {
            console.log(getEnv('VITE_API_BASE_URL'));

            const response = await
                fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                });

            if (!response.ok) {
                const data = await response.json();
                return toast.error('Google SignIn Failed !', data.message);
            }

            const data = await response.json();
            console.log('SignIn respones:', data);
            toast.success('User SignIn Successfully !')

    
                // set user data 
             dispatch(setUser(data.user))
                    

            navigate(RouteIndex);
        } catch (error) {
            console.error('Error during sign in:', error);
            toast.error('SignIn Failed !')

        }

    }


    return (
        <Button onClick={handleGoogleLogin}
            className="w-full bg-gray-200 text-black cursor-pointer
     hover:bg-gray-100">
            <FcGoogle />
            Continue With Google
        </Button>
    )
}

export default GoogleLogin
