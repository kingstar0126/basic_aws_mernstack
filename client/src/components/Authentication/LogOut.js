import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

import Croissant from '../../assets/Croissant.svg';
import UserContext from '../../context/UserContext';

/** Logs out the user */
const LogOut = () => {
  const [msg, setMsg] = useState('');
  const { setUser } = useContext(UserContext);

  /** Calls API and sets resets userContext */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/auth/logout', request)
      .then((response) => {
        setUser(null);
        setMsg('You logged out successfully!');
      })
      .catch((error) => {
        console.log('An error happened', error);
        setMsg(error.toString());
      });
  });

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center p-5'>
      <Image src={Croissant} width='80' height='80' />
      <span>{msg}</span>
      <Link className='logoutLink' to='/login'>Log in again</Link>
    </Container>
  );
};

export default LogOut;
