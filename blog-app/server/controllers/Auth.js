 import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js" 
import bcryptjs from 'bcryptjs' 

 export const Register = async (req, res, next)=>{  
    try { 
    const {firstName, email, password} = req.body 
    const checkUser = await User.findOne({email}) 

    if(checkUser){
        // user already exist 
        next(handleError(409, 'User already registered.'))
    } 
   
    // hash password 
    const hashPassword = bcryptjs.hashSync(password)
    // register new user 
     const user = new User({
        firstName,
        email, 
        password:hashPassword
        
     }) 
     await user.save(); 

      res.status(200).json({
        success: true,
        message: 'User Registered Successfully.'
      })
        
    } catch (error) {
        // handle error  
        console.log('Error in register user', error);
         
        next(handleError(500, error.message))
    }

} 
export const Login = async (req, res)=>{ 
    
}