import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

import './menu.css';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState([]);
  const [plans, setPlans] = useState([]);
  const [defaultPlan, setDefaultPlan] = useState('');

  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/plans', request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http error
          else {
            setPlans(data); // store plans
            setDefaultPlan(data[0]._id);
          }
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error]);

  useEffect(() => {
    filterMenu(defaultPlan);
  }, [defaultPlan]);

  const filterMenu = (planId) => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:5000/api/plan/menu/${planId}`, request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http error
          else setMenu(data); // store recipes
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  };

  return (
    <Container className='my-5'>
      <header>
        <h1 className='text-center'>Explore Our Menus</h1>
      </header>
      <Row className='d-flex justify-content-center'>
        <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
          {plans.map((plan, idx) => (
            <ToggleButton key={idx} value={idx} onClick={() => filterMenu(plan._id)} className='filterBtn'>
              <div className='d-flex flex-column'>
                <span>{plan.name}</span>
                <span>Serves {plan.servings}</span>
              </div>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Row>
      <Container>
        <CardDeck>
        {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
        {menu.map((recipe) => (
          <Col xs={12} lg={6} xl={4} className='py-2' key={recipe.title}>
            <Card key={recipe.title} id={recipe._id} >
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
    </Container>
  );
};

export default Menu;
