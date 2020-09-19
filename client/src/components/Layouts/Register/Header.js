import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => (
    <Nav className='d-none d-md-flex justify-content-center' variant='pills'>
      <Navbar.Brand className='flex-grow-1' as={Link} to='/'>Daily Recipe Logo</Navbar.Brand>
      <Nav.Item>
        <Nav.Link as={Link} to='/signin'>Welcome</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/delivery'>Address and Billing</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/choosePlan'>Choose your Plan</Nav.Link>
      </Nav.Item>
    </Nav>
);

export default Header;
