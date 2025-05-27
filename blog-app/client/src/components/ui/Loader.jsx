import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
        <Button> 
             <Loader2 className="animate-spin" /> 

             <span>Loading Please wait...</span>
        </Button> 

       
      
   );
}
