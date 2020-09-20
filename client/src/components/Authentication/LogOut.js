import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
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
        setMsg('You logged out successfully');
      })
      .catch((error) => {
        console.log('An error happened', error);
        setMsg(error);
      });
  });

  return (
    <Container className='d-flex flex-column justify-content-center'>
      <p>{msg}</p>
      <Link to='/'>back to homepage</Link>
    </Container>
  );
};

export default LogOut;
