import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../../assets/Logo.png';

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
      className='mx-auto align-items-center'
      variant='pills'>
        <Navbar.Brand as={Link} to='/'><Image src={Logo} width='200' /></Navbar.Brand>
        {Object.keys(steps).map((key, idx) => (
          <Nav.Item key={idx}>
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
