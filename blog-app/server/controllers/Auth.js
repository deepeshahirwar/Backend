 import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js" 
import bcryptjs from 'bcryptjs' 
 import jwt from 'jsonwebtoken' 


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


export const Login = async (req, res, next)=>{ 
    try { 
      const { email, password} = req.body  
      const user = await User.findOne({email}) 

      if(!user){
        next(handleError(404, 'Invalid login credentials.'))
      } 

      const hashPassword = user.password 
      const comparePassword = bcryptjs
      .compare(password, hashPassword) 
       
      if(!comparePassword){
         next(handleError(404, 'Invalid login credentials.'))
      } 
 // if user fill correct email , password  
 // then we create JWT token for login 
 
const token = jwt.sign({ 
  _id: user._id,
  firstName: user.firstName,
  email : user.email,
  avatar: user.avatar
}, process.env.JWT_SECRET_KEY)

     
//set cookie
res.cookie('access_toeken', token, {
  httpOnly:true,
  secure: process.env.NODE_ENV  === 'production',
  sameSite:process.env.NODE_ENV  === 'production' 
  ? 'none':'strict', 
  path:'/'

})
  

// send message 
res.status(200).json({
  success:true,
  user, 
  message: 'User login successfully!'
})

    } catch (error) {
       // handle error  
        console.log('Error in login user', error);
        next(handleError(500, error.message))
    }
}