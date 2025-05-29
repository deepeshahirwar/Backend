import React from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { RouteIndex, RouteSingIn, RouteSingUp } from './helpers/RouteNames'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <BrowserRouter> 
    
      <Routes>

        <Route
          path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

        </Route>

        <Route path={RouteSingIn} element={<SignIn />} />
        <Route path={RouteSingUp} element={<SignUp />} />



      </Routes>  

     

       <ToastContainer />
    </BrowserRouter>
  )
}

export default App
