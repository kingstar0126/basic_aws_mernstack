import React, { useState, useEffect } from 'react';

const LogOut = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/logout', request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setMsg(data.error);
          else {
            setMsg('You logged out successfully');
          }
        });
      })
      .catch((error) => {
        console.log('An error happened', error);
        setMsg(error);
      });
  });

  return (
    <p>{msg}</p>
  );
};

export default LogOut;
