import React from 'react';
import { NavLink } from "react-router-dom";

// Images
import logo from '../logo.svg';

// Bootstrap
import Col from 'react-bootstrap/Col';

function Sidebar() {
    return (
      <Col id="sidebar">
        <div className='pt-12 pb-12 vh-calc'>
          <div className='vh-calc sidebar-container'>

            <img id='mainLogo' src={logo} alt='Datamon Logo' className='mt-50 mb-50'/>

            <NavLink to="/" className='navItem'>Home</NavLink>
            <NavLink to="/compare" className='navItem'>Compare</NavLink>
            <NavLink to="/timeline" className='navItem'>Timeline</NavLink>

            <div className='navDisclaimer'>
              <p>
                All content is property of &copy;Pokemon 1995-2023 Nintendo/Game Freak 
                <br /><br />
                Designed by <span>Jughead Studio</span><br />
                Using <a href="https://pokeapi.co/">PokeAPI V2</a>
              </p>

            </div>
          </div>
        </div>
      </Col>
    )
}

export default Sidebar;