import express from 'express'
 
import { GoogleLogin, Login, Register } from '../controllers/Auth.js' 
 
const AuthRoutes = express.Router(); 

AuthRoutes.post('/register', Register)
AuthRoutes.post('/login', Login) 
AuthRoutes.post('/google-login', GoogleLogin) 

export default AuthRoutes