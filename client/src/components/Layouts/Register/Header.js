import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

/** Register layout's header */
const Header = () => {
  const locationRR = useLocation();
  const [location, setLocation] = useState('/signin');
  const [currStep, setCurrStep] = useState('/signin');

  useEffect(() => {
    const { pathname } = locationRR;
    setLocation(pathname);
  }, [locationRR]);

  return (
   <Navbar>
    <Nav
      className='justify-content-center mr-auto'
      variant='pills'
      onSelect={(eventKey, event) => {
        console.log('location', location);
        console.log(event.target.pathname);
        setCurrStep(event.target.pathname);
      }}>
        <Navbar.Brand className='flex-grow-1' as={Link} to='/'>Daily Recipe Logo</Navbar.Brand>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to='/signin'
            value='/signin'
            eventKey='1'
            className={location === currStep ? 'active' : 'disabled'}
          >Sign up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to='/delivery'
            value='/delivery'
            eventKey='2'
            className={location === currStep ? 'active' : 'disabled'}
          >Address and Billing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to='/choosePlan'
            value='/choosePlan'
            eventKey='3'
            className={location === currStep ? 'active' : 'disabled'}
          >Choose your Plan</Nav.Link>
        </Nav.Item>
    </Nav>
  </Navbar>
  );
};

export default Header;
