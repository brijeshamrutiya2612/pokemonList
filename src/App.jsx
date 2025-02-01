import React from 'react'
import "./App.css"
import Navbar from "./components/Navbar.jsx"
import LoginForm from "./components/Login.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<LoginForm/>}/>
    <Route path='/pokemonlist' element={<LoginForm/>}/>
   </Routes>
  </>
  )
}

export default App
