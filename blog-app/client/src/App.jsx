import React from 'react'
import './App.css' 
import { Button } from '@/components/ui/button' 
import { ButtonLoading } from '@/components/ui/Loader'


function App() {
 
  return (
    <> 
    <div className='font-bold text-2xl p-4'>
      Blog App 
     cliend is working !.  

       <div> 
          <Button>Click Me</Button>  
         
          
       </div>
    </div>

     <ButtonLoading/>
     
    </>
  )
}

export default App
