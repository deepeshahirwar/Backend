//const express = require("express");  , commonJs
import express from 'express' // moduleJs
const app = express(); 
 
const PORT = 3000;
 
// Home Route
app.get("/", (req, res) =>{
    res.send("hello world !!.");
})  

// About Route 
app.get('/about', (req, res)=>{
    res.status(200).send("about");
}) 
// Contact Route 
app.get('/contact', (req, res)=>{
    res.status(200).send("contact");
})




app.listen(PORT, (req, res)=>{
    console.log(`Server is running on http://localhost:${PORT} `);//http://localhost:3000
}) 

