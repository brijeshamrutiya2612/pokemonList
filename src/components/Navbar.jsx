import React from 'react'
import {Link} from 'react-router-dom';
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <>
      <nav className="navbar_main">
        <div className="nav_section">
            <h3 className="h3">Pok&#x00E9;dex</h3>
            <h3 className="h3"><Link to="/" style={{color:"white"}}>Login</Link></h3>
            </div>
        </nav>
    </>
  )
}

export default Navbar
