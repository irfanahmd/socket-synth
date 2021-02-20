import "antd/dist/antd.css";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Typography, Button, Modal} from 'antd';
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

// import userService from '../../utils/userService';
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import { Route, Switch } from "react-router-dom";


//look into NavLink on react-puppies-crud app for styling

const { Text} = Typography;

const NavBar = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let menu = (
    <Menu>
      <Menu.Item onClick={props.handleLogout}>
          Log Out
      </Menu.Item>
    </Menu>
  );

  let nav = props.user ? (
    <div>
    <Link to='https://github.com/irfanahmd/socket-synth' className="NavBar-link">
      <Button type="text">Github</Button>
    </Link>   
    &nbsp;&nbsp;&nbsp;&nbsp;  
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      {props.user.username}<DownOutlined />
      </a>
    </Dropdown>
    </div>
  ) : (
    // <div>
    //   <Link to='' className='NavBar-link' onClick={props.handleLogout} >Log Out</Link>
    //   &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    //   <span className='NavBar-welcome'>Welcome, {props.user.username}</span>
    // </div>
    <div>
      <Link to='/' className="NavBar-link">
        <Button type="text">Home</Button>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp; 
      <a href='https://github.com/irfanahmd/socket-synth' className="NavBar-link">
        <Button type="text">Github</Button>
      </a>       
      &nbsp;&nbsp;&nbsp;&nbsp;  
      <Link to='' className="NavBar-link">
        <Button type="text" onClick={showModal}>Log In</Button>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/signup" className="NavBar-link">
      <Button type="text">Sign Up</Button>
      </Link>
      <Modal title="Log In" width={300} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button form="loginForm" key="submit" htmlType="submit" type="primary" onClick={handleOk}>
              Log In
            </Button>,
          ]}>
      <Route
          path="/"
          render={({ history }) => (
            <LoginPage
              history={history}
              handleSignupOrLogin={props.handleSignupOrLogin}
            />
          )}
        />
      </Modal>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
