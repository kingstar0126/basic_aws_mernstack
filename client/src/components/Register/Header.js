import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Header = () => (
    <Nav>
      <Nav.Item>
        <Nav.Link as={Link} to='/signin'>Welcome</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to='/login'>Address and Billing</Nav.Link>
      </Nav.Item>
    </Nav>
);

export default Header;
