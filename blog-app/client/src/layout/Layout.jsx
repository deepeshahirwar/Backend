import AppSidebar from '@/components/AppSidebar'
import { Footer } from '@/components/Footer'
import  Topbar  from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return ( 
    
    <SidebarProvider>  
        <Topbar/>
      <AppSidebar/>
   
    <main className=' w-full '>
       
        <div className='w-full 
        min-h-[calc(100vh-40px)] 
        pt-16 px-5  justify-center
        '>
           <Outlet/>
        </div>
        {/* footer */} 
        <Footer/>
    </main>  

     </SidebarProvider>

  )
}
