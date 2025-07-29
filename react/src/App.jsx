import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import BusList from './components/BusList'
import BusSeats from './components/BusSeats'

const App = () => {
const [token,setToken] = useState(localStorage.getItem('token'))
const [userId,setUserId] = useState(localStorage.getItem('userId'))


  const handleLogin =(token,userId)=>{
    localStorage.setItem('token',token)
    localStorage.setItem('userId',userId)
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<BusList/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/login' element={<LoginForm onLogin={handleLogin}/>}/>
        <Route path='/bus/:busId' element={<BusSeats/>}/>
      </Routes>
    </div>
  )
}

export default App