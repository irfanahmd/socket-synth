import React from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css';

const NavBar = () => {
  return (
    <div className='NavBar'>
      <Link to="/login" className='NavBar-link'>Log In</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/signup" className='NavBar-link'>Sign Up</Link>
    </div>
  );
};

export default NavBar;