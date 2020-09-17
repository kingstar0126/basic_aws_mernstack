import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ChoosePlan = ({ history }) => {
  const [plans, setPlans] = useState([]);
  const [price, setPrice] = useState({ Individual: 31.96, Family: 55.92, Vegetarian: 35.96 });

  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/plans', request)
      .then((response) => {
        // http response error
        response.json().then((data) => {
          if (data.error) console.log(data.error);
          else {
            setPlans(data);
          }
        });
      })
      .catch((error) => {
        console.log('An error happened', error);
      }); // network error
  }, []);

  const selectPlan = (planId, recipesPerWeek) => {
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId, recipesPerWeek }),
    };
    fetch('http://localhost:5000/api/users/plan', request)
      .then((response) => {
        // http response error
        response.json().then((data) => {
          if (data.error) console.log(data.error);
          else history.push('/');
        });
      })
      .catch((error) => {
        console.log('An error happened', error);
      }); // network error
  };

  return (
    <Container className='my-5'>
      <h2 className='my-3'>Choose Your Plan</h2>
      <CardDeck>
        {plans.map((plan) => (
            <Card key={plan.name} id={plan.name}>
              <p>image here</p>
              <Card.Body>
                <Card.Title>{plan.name}</Card.Title>
                <Card.Text>{plan.description}</Card.Text>
                <div className='d-flex align-items-center'>
                  <ToggleButtonGroup name={plan.name} size='lg' >
                    {plan.recipesPerWeek.map((num) => (
                      <ToggleButton
                        type='radio' key={`${plan.name}-${num}`} value={num} name='radio'
                        onChange={(e) => (setPrice({
                          ...price,
                          [plan.name]: plan.pricePerServing * plan.servings * e.currentTarget.value,
                        }))}
                      >{num}</ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  <span className='ml-2'>Recipes Per Week</span>
                </div>
                <small className='col-12 p-0'>Each serves {plan.servings}</small>
              </Card.Body>
              <Card.Footer>
                <div className='d-flex justify-content-between'>
                  <p>${plan.pricePerServing} per serving</p>
                  <p>Weekly Price ${price[plan.name]}</p>
                </div>
              </Card.Footer>
              <Button id={`btn-${plan.name}`} variant='primary' onClick={() => selectPlan(plan._id, price[plan.name])}>Select</Button>
            </Card>
        ))}
      </CardDeck>
    </Container>
  );
};

export default ChoosePlan;
