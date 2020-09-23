import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

/** Register layout's header */
const Header = () => {
  const location = useLocation();
  const steps = {
    '/signin': 'Sign Up',
    '/choosePlan': 'Choose Your Plan',
    '/billing': 'Address and Billing',
  };

  return (
   <Navbar collapseOnSelect expand='md'>
    <Nav
      className='mx-auto'
      variant='pills'>
        <Navbar.Brand as={Link} to='/'>Daily Recipe Logo</Navbar.Brand>
        {Object.keys(steps).map((key, idx) => (
          <Nav.Item key={idx} className='text-center'>
            <Nav.Link
              className={location.pathname === key ? 'active' : 'disabled'}
            >{steps[key]}</Nav.Link>
          </Nav.Item>
        ))}
    </Nav>
  </Navbar>
  );
};

export default Header;
