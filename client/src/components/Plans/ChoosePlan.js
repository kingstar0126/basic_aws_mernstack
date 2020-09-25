import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

/** Displays all available plans and allows a user to choose a plan */
const ChoosePlan = ({ history }) => {
  const [plans, setPlans] = useState([]);
  const [recipesNum, setRecipesNum] = useState(2);
  const [error, setError] = useState('');
  const [price, setPrice] = useState({ Individual: 31.96, Family: 55.92, Vegetarian: 35.96 });
  const cookies = new Cookies();

  /** Calls API to get all plans (only re-render if there is an error) */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/plans', request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http error
          else setPlans(data); // store plans
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error]);

  /** Calls API to store the user's selected plan, recipes per week and total price */
  const selectPlan = (plan, recipesPerWeek, totalPrice) => {
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan, recipesPerWeek, totalPrice }),
    };
    fetch('http://localhost:5000/api/users/plan', request)
      .then((response) => {
        // http response error
        response.json().then((data) => {
          if (data.error) setError(data.error); // http response error
          else {
            cookies.set('userPlan', // store the plan in a cookie
              data,
              { expires: new Date(Date.now() + (15 * 60 * 1000)), sameSite: true });
            history.push('/billing');
          }
        });
      })
      .catch((err) => {
        console.log('An error happened', error); // network error
        setError(err.toString());
      });
  };

  return (
    <Container className='my-5'>
      <h2 className='my-3'>Choose Your Plan</h2>
      <CardDeck as={Row} className='justify-content-center'>
        {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
        {plans.map((plan) => (
          <Col xs={12} lg={6} xl={4} className='py-2'>
            <Card key={plan.name} id={plan.name} className='h-100'>
              <p>image here</p>
              <Card.Body>
                <Card.Title>{plan.name}</Card.Title>
                <Card.Text>{plan.description}</Card.Text>
                <div className='d-flex align-items-center'>
                  <ToggleButtonGroup type='radio' name={plan.name} value={recipesNum} size='lg' >
                    {plan.recipesPerWeek.map((num) => (
                      <ToggleButton
                        type='radio'
                        key={`${plan.name}-${num}`}
                        value={num}
                        name='radio'
                        onChange={(e) => {
                          const t = plan.pricePerServing * plan.servings * e.currentTarget.value;
                          setPrice({
                            ...price,
                            [plan.name]: t,
                          });
                          setRecipesNum(e.currentTarget.value);
                        }}
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
                  <p className='text-right'>Weekly Price ${price[plan.name]}</p>
                </div>
              </Card.Footer>
              <Button
                id={`btn-${plan.name}`}
                variant='primary'
                onClick={() => selectPlan(plan, recipesNum, price[plan.name])}
              >Select</Button>
            </Card>
          </Col>
        ))}
      </CardDeck>
    </Container>
  );
};

export default ChoosePlan;
