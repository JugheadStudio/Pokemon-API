import React from 'react';
import { NavLink } from "react-router-dom";

// Images
import logo from '../images/ballLogo.png';

// Bootstrap
import Col from 'react-bootstrap/Col';

function Sidebar() {
    return (
      <Col id="sidebar">
        <div className='pt-12 pb-12 h-100'>
          <div className='pt-50 h-100 sidebar-container'>

            <img id='mainLogo' src={logo} alt='pokeball log'/>
            <h1 className='mb-50'>PokeAPI</h1>

            <NavLink to="/" className='navItem'>Home</NavLink>
            <NavLink to="/compare" className='navItem'>Compare</NavLink>
            <NavLink to="/timeline" className='navItem'>Timeline</NavLink>

            <div className='navDisclaimer'>
              <p>Created by Ruan Jordaan Using PokeAPI V2 
              <br /><br />
              All content is property of Pokemon 1995-2023 Nintendo/Game Freak</p>

            </div>
          </div>
        </div>
      </Col>
    )
}

export default Sidebar;