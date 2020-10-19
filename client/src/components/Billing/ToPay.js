import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Cookies } from 'react-cookie';

/** Display a user's order information before payment */
const ToPay = ({ history }) => {
  const cookies = new Cookies();
  const userPlan = cookies.get('userPlan'); // retrive cookie with plan's data
  const deliveryDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));

  return (
    <Card className='mb-2 orderInfo'>
      <Card.Header>
        <span>Order Information
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        </span>
        <Button variant='secondary' onClick={() => history.push('/choosePlan')}>Edit
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
          </svg>
        </Button>
      </Card.Header>
      <Card.Body as={Row}>
        <Col xs={12} md={6} className='planDetails'>
          <ListGroup variant='flush'>
            <ListGroup.Item>Plan: {userPlan.plan.name}</ListGroup.Item>
            <ListGroup.Item>
              {userPlan.recipesPerWeek} recipes per week for {userPlan.plan.servings} people
            </ListGroup.Item>
            <ListGroup.Item>
              {`First delivery arrives ${deliveryDate.getMonth() + 1}/${deliveryDate.getDate()}/${deliveryDate.getFullYear()}`}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={12} md={6} className='payDetails border-top'>
          <ListGroup variant='flush'>
            <ListGroup.Item className='d-flex'>
              <Col xs={6}>Subtotal</Col>
              <Col xs={6} className='text-right'>${userPlan.totalPrice}</Col>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex'>
              <Col xs={6}>Shipping</Col>
              <Col xs={6} className='text-right'>Free</Col>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex'>
              <Col xs={6}>Total</Col>
              <Col className='font-weight-bold text-right' xs={6}>${userPlan.totalPrice}</Col>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default ToPay;
