import React, { useState, useEffect, useContext } from 'react';
import { Cookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import UserContext from '../../context/UserContext';
import Individual from '../../assets/Burger.svg';
import Vegetarian from '../../assets/Salad.svg';
import Family from '../../assets/Steak.svg';
import './plans.css';

/** Displays all available plans and allows a user to choose a plan */
const ChoosePlan = ({ history }) => {
  const [plans, setPlans] = useState([]);
  const [recipesNum, setRecipesNum] = useState(2);
  const [error, setError] = useState('');
  const [price, setPrice] = useState({ Individual: 31.96, Family: 55.92, Vegetarian: 35.96 });
  const [usrPlan, setUsrPlan] = useState('');

  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const location = useLocation();

  const images = [Individual, Vegetarian, Family];

  /** Calls API find if a user has a plan */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${process.env.REACT_APP_HOST}/api/users/plan`, request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) console.log(data.error); // http error
          else {
            setUsrPlan(data.plan._id); // store user plan if user is connected
            setRecipesNum(data.recipesPerWeek);
          }
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error, user]);

  /** Calls API to get all plans */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${process.env.REACT_APP_HOST}/api/plans`, request)
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
    fetch(`${process.env.REACT_APP_HOST}/api/users/plan`, request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http response error
          else {
            cookies.set('userPlan', // store the plan in a cookie
              data,
              { expires: new Date(Date.now() + (15 * 60 * 1000)) });
            usrPlan && location.pathname === '/pricing' ? history.push('/user/upcoming') : history.push('/billing');
          }
        });
      })
      .catch((err) => {
        console.log('An error happened', error); // network error
        setError(err.toString());
      });
  };

  return (
    <Container className='pricing my-5'>
      <header>
        <h1 className='my-3'>Choose a Plan</h1>
  <div>All of our available plans are different in servings and price. Make sure you choose the right amoun of recipes per week you want. {usrPlan && 'Feel free to change your current plan and choose a new one.'}</div>
      </header>
      <CardDeck as={Row} className='justify-content-center'>
        {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
        {plans.map((plan, idx) => (
          <Col xs={12} lg={6} className='cardWrapper'>
            <Card key={plan.name} id={plan.name} className='h-100'>
              <Card.Header>
                <Card.Img src={images[idx]} width='100' height='100' />
                <Card.Title>{plan.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>{plan.description}</Card.Text>
                <div className='d-flex align-items-center justify-content-between'>
                  <span>Recipes per week:</span>
                  <ToggleButtonGroup type='radio' name={plan.name} defaultValue={2} size='lg' >
                    {plan.recipesPerWeek.map((num, idx) => (
                      <ToggleButton
                        type='radio'
                        key={`${plan.name}-${num}`}
                        value={`${plan.name}-${num}`}
                        name='options'
                        className={usrPlan === plan._id && num === recipesNum && 'usrRecipesNum'}
                        onChange={(e) => {
                          const selectedRecipesNum = e.currentTarget.value.split('-')[1];
                          const total = plan.pricePerServing * plan.servings * selectedRecipesNum;
                          setPrice({
                            ...price,
                            [plan.name]: total,
                          });
                          setRecipesNum(selectedRecipesNum);
                        }}
                      >{num}</ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </div>
                <small className='col-12 p-0'>Each serves {plan.servings}</small>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col className='planPrices'>
                    <span>Per Serving</span>
                    <span>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' heigth='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      {plan.pricePerServing}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col className='planPrices'>
                    <span>Weekly Price</span>
                    <span className='totalPrice'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='25' heigth='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      {price[plan.name]}
                    </span>
                  </Col>
                </Row>
              </Card.Footer>
              <Button
                variant='secondary'
                id={`btn-${plan.name}`}
                className={usrPlan === plan._id && 'usrPlan'}
                onClick={!usrPlan && error ? history.push('/signin') : () => selectPlan(plan, recipesNum, price[plan.name])}
              >Select</Button>
            </Card>
          </Col>
        ))}
      </CardDeck>
    </Container>
  );
};

export default ChoosePlan;
