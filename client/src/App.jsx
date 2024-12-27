import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import UserSignUp from './pages/UserSignUp'
import WorkerSignUp from './pages/WorkerSignUp'
import SignIn from './pages/SignIn'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/user-sign-up' element={<UserSignUp/>}/>
          <Route path='/worker-sign-up' element={<WorkerSignUp/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
