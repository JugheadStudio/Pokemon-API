import React from 'react';
import { NavLink } from "react-router-dom";

// Images
import logo from '../logo.svg';

// Bootstrap
import Col from 'react-bootstrap/Col';

function Sidebar() {
  return (
    <Col xs={2} id="sidebar" className='d-sidebar'>
      <div className='pt-12 pb-12 vh-calc'>
        <div className='vh-calc sidebar-container'>

          <img id='mainLogo' src={logo} alt='Datamon Logo' className='mt-50 mb-50'/>

          <NavLink to="/" className='navItem'>Home</NavLink>
          <NavLink to="/compare" className='navItem'>Compare</NavLink>
          <NavLink to="/timeline" className='navItem'>Timeline</NavLink>
        </div>
      </div>
    </Col>
  )
}

export default Sidebar;