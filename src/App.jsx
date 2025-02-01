import React from 'react'
import "./App.css"
import Navbar from "./components/Navbar.jsx"
import LoginForm from "./components/Login.jsx"
import PokemonList from "./components/PokemonList.jsx"
import SignupForm from "./components/signUpForm.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<LoginForm/>}/>
    <Route path='/pokemonlist' element={<PokemonList/>}/>
    <Route path='/signup' element={<SignupForm/>}/>
   </Routes>
  </>
  )
}

export default App
