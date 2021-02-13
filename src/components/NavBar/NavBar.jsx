import React from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css';


//look into NavLink on react-puppies-crud app for styling

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