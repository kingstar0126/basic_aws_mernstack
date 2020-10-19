import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './profile.css';

/** Displays the user profile information */
const Profile = ({ history }) => {
  const [user, setUser] = useState({});
  const [plan, setPlan] = useState({});
  const [error, setError] = useState('');

  /** Calls API to get the connected user's data */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/users/profile', request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http error
          else setUser(data); // store user data
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error]);

  /** Calls API to get the connected user's plan information */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/users/plan', request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http error
          else setPlan(data); // store user plan
        });
      })
      .catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error]);

  const PlanInfo = () => (
      <div className='planInfo'>
        <header>
          <h2>Your Plan Information</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </header>
        <Form.Group as={Row}>
          <Form.Label column xs='12' md='4'>Plan</Form.Label>
          <Col xs='8'>
            <Form.Control plaintext readOnly defaultValue={plan.plan.name} />
          </Col>
          <Form.Label column xs='12' md='4'>Diet</Form.Label>
          <Col xs='8'>
            <Form.Control plaintext readOnly defaultValue={plan.plan.diet} />
          </Col>
          <Form.Label column xs='12' md='4'>Servings</Form.Label>
          <Col xs='8'>
            <Form.Control plaintext readOnly defaultValue={plan.plan.servings}/>
          </Col>
          <Form.Label column xs='12' md='4'>Recipes Per Week</Form.Label>
          <Col xs='8'>
            <Form.Control plaintext readOnly defaultValue={plan.recipesPerWeek}/>
          </Col>
          <Form.Label column xs='12' md='4'>Total Price</Form.Label>
          <Col xs='8'>
            <Form.Control plaintext readOnly defaultValue={`$${plan.totalPrice}`}/>
          </Col>
        </Form.Group>
        <Button onClick={() => history.push('/pricing')}>Change Your Plan</Button>
      </div>
  );

  const AccountInfo = () => (
    <div className='accInfo'>
      <header>
        <h2>Account Information</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </header>
      <Form.Group as={Row}>
        <Form.Label column xs='12' md='4'>Name</Form.Label>
        <Col xs='8'>
          <Form.Control plaintext readOnly defaultValue={user.name} />
        </Col>
        <Form.Label column xs='12' md='4'>Email</Form.Label>
        <Col xs='8'>
          <Form.Control plaintext readOnly defaultValue={user.email} />
        </Col>
        <Form.Label column xs='12' md='4'>Password</Form.Label>
        <Col xs='8'>
          <Form.Control plaintext readOnly defaultValue='*******' />
        </Col>
      </Form.Group>
    </div>
  );

  const DeliveryInfo = () => (
    <div className='deliveryInfo'>
      <header>
        <h2>Delivery Information</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path fill="#fff" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      </header>
      <Form.Group as={Row}>
        <Form.Label column xs='12' md='4'>Address</Form.Label>
        <Col xs='8'>
          <Form.Control plaintext readOnly defaultValue={user.address || 'Your Awesome Address'}></Form.Control>
        </Col>
        <Form.Label column xs='12' md='4'>City</Form.Label>
        <Col xs='8'>
          <Form.Control plaintext readOnly defaultValue={user.city || 'Your Awesome City'}></Form.Control>
        </Col>
        <Form.Label column xs='12' md='4'>State</Form.Label>
          <Col xs='8'>
            <Form.Control plaintext readOnly defaultValue={user.state || 'Your Awesome State'}></Form.Control>
          </Col>
        <Form.Label column xs='12' md='4'>Phone</Form.Label>
        <Col xs='8'>
          <Form.Control plaintext readOnly defaultValue={user.phone || 'Your Awesome Phone Number'}></Form.Control>
        </Col>
        <Form.Label column xs='12' md='4'>Zip Code</Form.Label>
        <Col xs='8'>
          <Form.Control plaintext readOnly defaultValue={user.zip || 'Your Awesome Zip Code'}></Form.Control>
        </Col>
      </Form.Group>
    </div>
  );

  return (
    <Container className='my-5 settings'>
      <h2>Account Settings</h2>
      <Tab.Container defaultActiveKey='plan'>
        <Row className='my-4'>
          <Col md={3}>
            <Nav className='flex-column' variant='pills'>
              <Nav.Item>
                <Nav.Link eventKey='plan'>Plan Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='account'>Account Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='delivery'>Delivery Info</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={9} className='p-3'>
            <Tab.Content>
              <Tab.Pane eventKey='plan'>
                {plan.plan && <PlanInfo />}
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey='account'>
                <AccountInfo />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey='delivery'>
                <DeliveryInfo />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Profile;
