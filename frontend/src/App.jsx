import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Appointment from './pages/Appointment'
import About from './pages/About'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
       <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/appointment' element={<Appointment/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
        <ToastContainer position='top-center'/>
       </Router>
    </>
  )
}

export default App