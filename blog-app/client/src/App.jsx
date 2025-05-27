import React from 'react'
import './App.css'

import { BrowserRouter , Route, Routes } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { RouteIndex } from './helpers/RouteNames' 
import Index from './pages/Index'



function App() {

  return (
    <BrowserRouter>
      <Routes> 

      <Route
       path = {RouteIndex} element = {<Layout/>}>
        <Route index element = {<Index/>}/>  

        </Route> 

      </Routes>
    </BrowserRouter>
  )
}

export default App
