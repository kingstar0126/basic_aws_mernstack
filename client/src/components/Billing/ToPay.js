import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Cookies } from 'react-cookie';

/** Display a user's order information before payment */
const ToPay = () => {
  const cookies = new Cookies();
  const userPlan = cookies.get('userPlan'); // retrive cookie with plan's data

  return (
    <Card className='mb-2'>
      <Card.Header>Order Information</Card.Header>
      <Card.Body as={Row}>
        <Col xs={6}>
          <Card.Text>{userPlan.plan.name} Plan </Card.Text>
          <Card.Text>
            {userPlan.recipesPerWeek} recipes per week for {userPlan.plan.servings} people
          </Card.Text>
          <Card.Text>
            First delivery date 7 days from now *
          </Card.Text>
        </Col>
        <Card.Text as={Col} xs={6}>
          <Row>
            <Col xs={6}>Subtotal</Col>
            <Col xs={6}>{userPlan.totalPrice}</Col>
          </Row>
          <Row>
            <Col xs={6}>Shipping</Col>
            <Col xs={6}>Free</Col>
          </Row>
          <Row>
            <Col xs={6}>Total</Col>
            <strong as={Col} xs={6}>{userPlan.totalPrice}</strong>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ToPay;
