import React from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css';


//look into NavLink on react-puppies-crud app for styling

const NavBar = (props) => {
  let nav = props.user ? 

  <div>
    <Link to='' className='NavBar-link' onClick={props.handleLogout} >Log Out</Link>
    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <span className='NavBar-welcome'>Welcome, {props.user.username}</span>
  </div>
    :
  <div>
    <Link to='/login' className='NavBar-link'>Log In</Link>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to='/signup' className='NavBar-link'>Sign Up</Link>
  </div>;

  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};

export default NavBar;