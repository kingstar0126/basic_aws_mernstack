import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import UserContext from '../../../context/UserContext';

/** Public layout's header */
const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand='md' sticky='top'>
      <Navbar.Brand as={Link} to='/'>Daily Recipe Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto">
          <Nav.Link as={Link} eventKey='1' to='/menu'>Explore Menu</Nav.Link>
          <Nav.Link as={Link} eventKey='2' to='/pricing'>Pricing</Nav.Link>
        </Nav>
        {user ? (
          <Nav>
            <Nav.Link as={Link} eventKey='3' to='/profile'>My Profile</Nav.Link>
            <Nav.Link as={Link} eventKey='4' to='/logout'>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Nav.Link as={Link} eventKey='3' to='/signin'>Sign Up</Nav.Link>
            <Nav.Link as={Link} eventKey='4' to='/login'>Log In</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
