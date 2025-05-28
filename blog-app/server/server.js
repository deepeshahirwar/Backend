import express from 'express'   
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors' 
import mongoose from 'mongoose';
import AuthRoute from './routes/AuthRoute.js';

 
dotenv.config(); 
const PORT =  process.env.PORT
const app = express();   

app.use(cookieParser())
app.use(express.json()); 

// connection frontend to backend at same URL
app.use(cors({
    origin:process.env.FORNTEND_URL, 
    credentials:true
}))



app.get('/', (req, res)=>{
    res.send('hello backend! ')
})   

// route setup 
app.use('/api/auth', AuthRoute)

 
// MongoDB Database connection
mongoose.connect(process.env.MONGODB_URL, {
   dbName: 'MernBlog' 
})
.then(()=>{
    console.log("Database Connected !");
    
})
.catch(error =>{
    console.log("Databse Connection Failed!", error);
    
}) 


//   app is running here
app.listen(PORT, ()=>{
    console.log(`server is running on port: http://localhost:${PORT}`);
    
}) 


// Error handling middleware 
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500 
    const message = err.message || 'Internal server error.'
     
    res.status(statusCode).json({
        success:false, 
        statusCode,
        message

    })
})