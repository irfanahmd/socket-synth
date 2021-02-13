import React from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css';


//look into NavLink on react-puppies-crud app for styling

const NavBar = (props) => {
  let nav = props.user ? 

  <div>
    <Link to='' className='NavBar-link'>LOG OUT</Link>
    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <span className='NavBar-welcome'>WELCOME, {props.user.username}</span>
  </div>
    :
  <div>
    <Link to='/login' className='NavBar-link'>LOG IN</Link>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
  </div>;

  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};

export default NavBar;