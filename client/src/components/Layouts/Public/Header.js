import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Link, useLocation } from 'react-router-dom';

import UserContext from '../../../context/UserContext';
import './public.css';
import Logo from '../../../assets/Logo.png';

/** Public layout's header */
const Header = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'activeLink' : '');

  return (
    <Navbar sticky='top' className='publicHeader' collapseOnSelect expand='md'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand as={Link} to='/'><Image src={Logo} alt='Daily Recipe Logo' /></Navbar.Brand>
      <Navbar.Collapse id="navbar">
        <Nav>
          {user && <Nav.Link as={Link} eventKey='1' to='/user/thisWeek' className={isActive('/user/thisWeek')}>This Week</Nav.Link>}
          {user && <Nav.Link as={Link} eventKey='2' to='/user/upcoming' className={isActive('/user/upcoming')}>Upcoming</Nav.Link>}
          <Nav.Link as={Link} eventKey='3' to='/menu' className={isActive('/menu')}>Explore Menu</Nav.Link>
          <Nav.Link as={Link} eventKey='4' to='/pricing' className={isActive('/pricing')}>Pricing</Nav.Link>
          {user ? (
            <div className='d-md-flex ml-md-auto'>
              <Nav.Link as={Link} eventKey='5' to='/user/profile' className={isActive('/user/profile')}>My Profile</Nav.Link>
              <Nav.Link as={Link} eventKey='6' to='/logout' className={isActive('/logout')}>Logout</Nav.Link>
            </div>
          ) : (
            <div className='d-md-flex ml-md-auto'>
              <Nav.Link as={Link} eventKey='7' to='/signin' className={isActive('/signin')}>Sign Up</Nav.Link>
              <Nav.Link as={Link} eventKey='8' to='/login' className={isActive('/login')}>Log In</Nav.Link>
            </div>
          )}
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
