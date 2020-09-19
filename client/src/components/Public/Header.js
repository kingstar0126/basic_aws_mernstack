import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='container'>
      <Navbar expand='lg'>
        <Navbar.Brand as={Link} to='/'>Daily Recipe Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/menu'>Explore Menu</Nav.Link>
            <Nav.Link as={Link} to='/pricing'>Pricing</Nav.Link>
          </Nav>
          {user ? (
            <Nav>
              <Nav.Link as={Link} to='/profile'>Hi {user.name}</Nav.Link>
              <Nav.Link as={Link} to='/logout'>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to='/signin'>Sign Up</Nav.Link>
              <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
