import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Home from './components/Home.jsx'
import './App.css'
import {  Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { VerifyUser } from './utils/VerifyUser.jsx'

function App() {



  return (
    <>
         <div className="p-2 w-screen h-screen flex items-center justify-center">
      <Routes>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element ={<VerifyUser/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
    </>
  )
}

export default App
