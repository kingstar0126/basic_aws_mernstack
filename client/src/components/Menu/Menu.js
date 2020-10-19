import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';

import RecipeCard from '../Recipe/RecipeCard';
import './menu.css';

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState([]);
  const [plans, setPlans] = useState([]);
  const [currPlan, setCurrPlan] = useState({});

  /** Updates the selected plan and filters the menu by it */
  const selectFilter = (planId, name, description) => {
    filterMenu(planId);
    setCurrPlan({ name, description });
  };

  /** Calls API to store all the available plans  */
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
            selectFilter(data[0]._id, data[0].name, data[0].description); // initiate filter
          }
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Calls API to filter the menu by the given planId */
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
    <Container fluid='md' className='my-5'>
      <Container className='planSection'>
        <header>
          <h1 className='text-center'>Explore Our Menus</h1>
        </header>
        <ul className='plansFilter'>
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={currPlan.name === plan.name ? 'active planItem' : 'planItem'}
              onClick={() => selectFilter(plan._id, plan.name, plan.description)}>
                <h5>{plan.name}</h5>
                <span>Serves {plan.servings}</span>
            </li>
          ))}
        </ul>
      </Container>
      <Container className='descriptionSection'>
        <div className='planDescription' xs={12} md={6}>{currPlan && currPlan.description}</div>
      </Container>
      <Container className='cardsSection'>
        <CardDeck as={Row} className='justify-content-center'>
          {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
          {menu.map((recipe, idx) => (
            <RecipeCard key={idx} recipe={recipe} history={history} />
          ))}
        </CardDeck>
      </Container>
    </Container>
  );
};

export default Menu;
