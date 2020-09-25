import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Cookies } from 'react-cookie';

/** Display a user's order information before payment */
const ToPay = () => {
  const cookies = new Cookies();
  const userPlan = cookies.get('userPlan'); // retrive cookie with plan's data
  const deliveryDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));

  return (
    <Card className='mb-2 orderInfo'>
      <Card.Header>Order Information</Card.Header>
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
              <Col xs={6} className='text-right'>{userPlan.totalPrice}</Col>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex'>
              <Col xs={6}>Shipping</Col>
              <Col xs={6} className='text-right'>Free</Col>
            </ListGroup.Item>
            <ListGroup.Item className='d-flex'>
              <Col xs={6}>Total</Col>
              <Col className='font-weight-bold text-right' xs={6}>{userPlan.totalPrice}</Col>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default ToPay;
