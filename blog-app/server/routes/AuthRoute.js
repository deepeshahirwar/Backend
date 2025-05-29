import express from 'express'
 
import { GoogleLogin, Login, Logout, Register } from '../controllers/Auth.js' 
 
const AuthRoutes = express.Router(); 

AuthRoutes.post('/register', Register)
AuthRoutes.post('/login', Login) 
AuthRoutes.post('/google-login', GoogleLogin)  
AuthRoutes.get('/logout', Logout)

export default AuthRoutes