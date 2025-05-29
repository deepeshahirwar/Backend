import React, { use } from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'

import { IoLogInSharp } from "react-icons/io5";

import SearchBox from './SearchBox';
import { RouteIndex, RouteProfile, RouteSingIn } from '@/helpers/RouteNames';
import { useDispatch, useSelector } from 'react-redux';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 

import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoMdAdd } from "react-icons/io";
import { removeUser } from '@/redux/user/user.slice';
import { toast } from 'react-toastify';
import { getEnv } from '@/helpers/getEnv';


const Topbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user) 
  const navigate = useNavigate(); 

  const handleLogout = async() => { 
     
           // User logout logic here 
            try {
                 console.log(getEnv('VITE_API_BASE_URL'));
                 
                 const response = await 
                 fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
                   method: 'GET', 
                   
                   credentials:'include',
                  
                 });
               const data = await response.json();
                 if (!response.ok) { 
                   return toast.error('SignIn Failed !', 'Invalid email or password');
                  
                 }  
      
                 // set user data  
              const agree = confirm('Are you sure you want to logout?');
          if (agree) {
            dispatch(removeUser(data.user));
              console.log('Logout response:', data);
             toast.success('User Logout Successfully!');
              navigate(RouteIndex); // Redirect to Sign In page
            }

               } catch (error) {
                 console.error('Error during Logout:', error);
                 toast.error('Logout Failed !')
                 
               } 

     
  }


  return (
    <div className=' flex justify-between 
    items-center h-16 fixed w-full bg-white 
    z-20 px-5 border-b 
    '>

      {/* logo */}
      <div>Logo</div>

      {/* search bar */}
      <div className='w-[500px]'>
        <SearchBox />
      </div>

      {/* login */}

      {
        !user.isLoggedIn ?
          <div className=''>
            <Button
              asChild
              className="w-full bg-blue-600
          text-white font-medium py-2 
           hover:bg-blue-700 transition rounded-full"
            >

              <Link
                to={RouteSingIn}

              >
                <IoLogInSharp />
                Sign In</Link>
            </Button>
          </div> : <DropdownMenu>
           

            {/* show profile dropdown menu */}
            <DropdownMenuTrigger className='cursor-pointer'>
              <Avatar>
                <AvatarImage src={user.user.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>


            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>  

                 <div className="px-4 py-2 
             rounded-md bg-gray-100
             text-gray-800 font-medium 
             shadow-sm w-fit  cursor-pointer">
              {user.user.firstName}
             </div> 
             <p className='mt-4'>{user.user.email}</p>

              </DropdownMenuLabel> 

              <DropdownMenuSeparator /> 

              <DropdownMenuItem >  
                <FaRegUser />
                <Link to={RouteProfile}>
                Profile</Link>
                </DropdownMenuItem> 

              <DropdownMenuItem> 
                <IoMdAdd />
                <Link to="">Create Blog</Link>
              </DropdownMenuItem> 
   
          <DropdownMenuSeparator /> 
 
         {/* user logout menu */}
              <DropdownMenuItem 
               className="cursor-pointer" 
               onClick={handleLogout}
               > 
               
                <LuLogOut className=' '/> 
                Logout

              </DropdownMenuItem>
             
            </DropdownMenuContent>
          </DropdownMenu>

      }


    </div>
  )
}


export default Topbar