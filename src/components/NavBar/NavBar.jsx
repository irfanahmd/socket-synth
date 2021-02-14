import "antd/dist/antd.css";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Typography, Button} from 'antd';

import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

//look into NavLink on react-puppies-crud app for styling

const { Text} = Typography;

const NavBar = (props) => {

  let menu = (
    <Menu>
      <Menu.Item>
        <Link to="" className="NavBar-link" onClick={props.handleLogout}>
          Log Out
        </Link>
      </Menu.Item>
    </Menu>
  );

  let nav = props.user ? (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      {props.user.username}<DownOutlined />
      </a>
    </Dropdown>
  ) : (
    // <div>
    //   <Link to='' className='NavBar-link' onClick={props.handleLogout} >Log Out</Link>
    //   &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    //   <span className='NavBar-welcome'>Welcome, {props.user.username}</span>
    // </div>
    <div>
      <Link to="/login" className="NavBar-link">
        <Button type="text">Log In</Button>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/signup" className="NavBar-link">
      <Button type="text">Sign Up</Button>
      </Link>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
