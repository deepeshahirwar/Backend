import React from 'react'
import { Button } from './ui/button' 
import { Link } from 'react-router-dom'  

import { IoLogInSharp } from "react-icons/io5";

import  SearchBox  from './SearchBox';

const Topbar = () =>  {
  return (
    <div className=' flex justify-between 
    items-center h-16 fixed w-full bg-white 
    z-20 px-5 border-b 
    '>   
 
    {/* logo */}
    <div>Logo</div> 
 
    {/* search bar */}
    <div className='w-[500px]'>
       <SearchBox/>
     </div> 

    {/* login */}
    <div className=''>  
        <Button asChild  className="rounded-full">  
              
            <Link >
             <IoLogInSharp />
             Sign In</Link>
        </Button>
       
      
    </div>

    </div>
  )
}
 

export default Topbar