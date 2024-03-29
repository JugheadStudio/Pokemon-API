import React from 'react';
import { NavLink } from "react-router-dom";

// Images
import logo from '../logo.svg';

// Bootstrap
import { Navbar, Nav } from 'react-bootstrap';

function Sidebar() {
    return (
      <Navbar collapseOnSelect expand='xl' fixed='top' className='mobile-nav-container'>
        
          <div className='align-items-center w-100 d-flex'>
            <div className='w-50'>
              <img id='mainLogo' src={logo} alt='Datamon Logo'/>
            </div>

            <div className='w-50 text-end'>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' className='navbar-dark'/>
            </div>
          </div>

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='text-center mt-50 mb-50'>
            <NavLink to="/" className='navItem'>Home</NavLink>
            <NavLink to="/compare" className='navItem'>Compare</NavLink>
            <NavLink to="/timeline" className='navItem'>Timeline</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Sidebar;