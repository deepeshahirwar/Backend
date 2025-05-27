import React from 'react' 
import { LuSearch } from "react-icons/lu";
 
const SearchBox =()=> {
  return (
    
       <form className='flex items-center gap-2'>
         <input type="text" 
         placeholder='Search here...' 
         className=' border-2  
         bg-gray-100 
        
            focus:outline-none focus:border-blue-500
        
          w-full
         rounded-full px-4 py-2' />  
          <div className='hidden md:block text-3xl'> 
          <LuSearch />
          </div> 

          
        

       </form>  
  )
}

export default SearchBox;
