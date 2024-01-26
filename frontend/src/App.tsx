import { useState } from 'react'
import {Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import Chat from './pages/Chat'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
// console.log(useAuth());
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} /> 
        {/* other routes */}
      </Routes>
    </main>
  )
}

export default App
