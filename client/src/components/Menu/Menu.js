import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import './menu.css';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState([]);
  const [plans, setPlans] = useState([]);
  const [currPlan, setCurrPlan] = useState({});

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
            selectFilter(data[0]._id, data[0].name, data[0].description);
          }
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error]);

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

  const selectFilter = (planId, name, description) => {
    console.log(planId, name, description)
    filterMenu(planId);
    setCurrPlan({ name, description });
  }

  return (
    <Container className='my-5'>
      <header>
        <h1 className='text-center'>Explore Our Menus</h1>
      </header>
      <Row className='d-flex justify-content-center mb-3'>
        <ul className='plansFilter'>
          {plans.map((plan) => {
            return(
            <li
              key={plan.name}
              className={currPlan.name === plan.name ? 'active planItem' : 'planItem'}
              onClick={() => selectFilter(plan._id, plan.name, plan.description)}>
                <h5>{plan.name}</h5>
                <span>Serves {plan.servings}</span>
            </li>
            )
         })}
        </ul>
        <Col className='text-center mb-2' xs={12} md={6}>{currPlan && currPlan.description}</Col>
      </Row>
      <Container>
        <CardDeck as={Row} className='justify-content-center'>
          {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
          {menu.map((recipe) => (
            <Col xs={12} md={8} lg={6} xl={4} className='cardWrapper p-lg-0' key={recipe.name}>
              <Card key={recipe.title} id={recipe._id}>
                <Image fluid src={`https://source.unsplash.com/random/358x300/?${recipe.title}`} />
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
