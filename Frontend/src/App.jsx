import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login.jsx'
import DashBoard from './pages/DashBoard.jsx'
import Signup from './pages/Signup.jsx'
import Clients from './pages/Clients.jsx'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<DashBoard />} />
    <Route path="/signup" element={<Signup />} />
    <Route path='/manager/clients' element={<Clients/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App