import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar" 

import {Link }from 'react-router-dom'

import { IoIosHome } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi"; 
import { FaBlog } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";  
import { GoDotFill } from "react-icons/go";

const AppSidebar = () => {
  return (
    <Sidebar>
       <SidebarHeader>
         <div  className="text-2xl font-bold">
            Logo
         </div>
       </SidebarHeader>
      <SidebarContent>
        
        <SidebarGroup> 
           <SidebarMenu>  
    
         {/* Home section*/}
             <SidebarMenuItem> 
             <SidebarMenuButton> 
                 <IoIosHome />
                 <Link to="">Home</Link>
             </SidebarMenuButton>  
            </SidebarMenuItem>  
 
 
          {/* Categories section */}
            <SidebarMenuItem> 
             <SidebarMenuButton> 
                 <BiSolidCategory />
                 <Link to="">Categories</Link>
             </SidebarMenuButton>  
            </SidebarMenuItem> 

         
         {/* Blogs section */}
              <SidebarMenuItem> 
             <SidebarMenuButton> 
                 <FaBlog />
                 <Link to="">Blogs</Link>
             </SidebarMenuButton>  
            </SidebarMenuItem>  
 
            {/* Comments section */}
            <SidebarMenuItem>  
             <SidebarMenuButton> 
               <FaCommentDots />
                 <Link to="">Comments</Link>
             </SidebarMenuButton>  
            </SidebarMenuItem>  
 
           {/* Users section */}
            <SidebarMenuItem> 
             <SidebarMenuButton> 
                <FaUserFriends />
                 <Link to="">Users</Link>
             </SidebarMenuButton>  
            </SidebarMenuItem> 




           </SidebarMenu>
        </SidebarGroup> 

        
        {/* All categories listed here */}
        <SidebarGroup>  

            <SidebarGroupLabel> 
                Categories
            </SidebarGroupLabel> 


           <SidebarMenu>  
    
        {/* business */}
             <SidebarMenuItem> 
             <SidebarMenuButton> 
                <GoDotFill />
                 <Link to="">Business</Link>
             </SidebarMenuButton>  
            </SidebarMenuItem>   

             {/* business */}
             <SidebarMenuItem> 
             <SidebarMenuButton> 
                <GoDotFill />
                 <Link to="">Technologies</Link>
             </SidebarMenuButton>  
            </SidebarMenuItem>  
 
 

           </SidebarMenu>
        </SidebarGroup>



      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar