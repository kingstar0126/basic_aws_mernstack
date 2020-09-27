import React, { useEffect, useState } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './userMenu.css';

const UserMenu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/users/planInstance', request)
      .then((request) => {
        request.json().then((data) => {
          if (data.error) setError(data.error);
          else setMenu(data.plan.menu);
        });
      })
      .catch((error) => setError(error.toString()));
  }, []);

  const selectCard = (event) => {
    event.preventDefault();
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId: event.currentTarget.id }),
    };
    fetch('http://localhost:5000/api/users/recipes', request)
      .then((request) => {
        request.json().then((data) => {
          if (data.error) setError(data.error);
          else setSelected(data);
        });
      })
      .catch((error) => setError(error.toString()));
  };

  return (
    <Container className='my-5 userMenu'>
      <CardDeck as={Row} className='justify-content-center'>
        {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
        {menu.map((recipe) => (
          <Col xs={12} lg={6} xl={4} className='py-2'>
            <Card key={recipe.title} id={recipe._id} className={selected.includes(recipe._id) && 'active'} onClick={(e) => selectCard(e)}>
              <p>image here</p>
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <div className='d-flex justify-content-between'>
                  <span>{recipe.duration}</span>
                  <span>Details</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </CardDeck>
    </Container>
  );
};

export default UserMenu;
