import React, { useState } from 'react';
// import { loadStripe } from "stripe";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './Billing.css';

// const stripePromise = loadStripe("pk_test...");

/* const checkoutBtn = () => {
  return (
    <Button id="checkout-button" role="link" onClick={handleCheckout}>
      Checkout
    </Button>
  )
} */

/** Gets the user's delivery information */
const DeliveryForm = ({ history }) => {
  const [formState, setFormState] = useState({
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState('');

  /** Handles form submition by calling API in backend */
  const handleDelivery = (event) => {
    event.preventDefault();

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    };
    fetch('http://localhost:5000/api/users/delivery', request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http response error
          else history.push('/choosePlan');
        });
      })
      .catch((error) => {
        console.log('An error happened', error);
        setError(error.toString()); // network error
      });
  };

  /** Sets form's state when fields are changed by the user */
  const handleChange = (event) => {
    const key = event.target.name;
    setFormState({ ...formState, [key]: event.target.value });
  };

  return (
    <Container className='my-5 deliveryForm'>
      <h2 className='my-3'>Your Delivery Information</h2>
      <Form onSubmit={handleDelivery}>
        <Form.Row>
          <Form.Group as={Col} xs='auto' md='6'>
            <Form.Label>Address</Form.Label>
            <Form.Control name='address' defaultValue='77 Your Street' onChange={handleChange} disabled />
          </Form.Group>
          <Form.Group as={Col} xs='auto' md='6'>
            <Form.Label>Phone</Form.Label>
            <Form.Control name='phone' onChange={handleChange} defaultValue='(123)123-1234' disabled/>
          </Form.Group>
        </Form.Row>
        <Form.Row>
         <Form.Group as={Col} xs='auto' md='6'>
            <Form.Label>City</Form.Label>
            <Form.Control name='city' onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} xs='auto' md='3'>
            <Form.Label>State</Form.Label>
            <Form.Control name='state' as="select" onChange={handleChange} >
              <option>Choose...</option>
              <option value="AZ">Arizona</option>
              <option value="CA">California</option>
              <option value="CT">Connecticut</option>
              <option value="FL">Florida</option>
              <option value="NV">Nevada</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="OR">Oregon</option>
              <option value="TX">Texas</option>
              <option value="WA">Washington</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} xs='auto' md='3'>
            <Form.Label>Zip</Form.Label>
            <Form.Control name='zip' minLength='5' maxLength='5' onChange={handleChange} />
          </Form.Group>
        </Form.Row>
        {error.length
          ? (
            <Form.Control.Feedback type='invalid' className='d-block'>
              { error.length ? error : '' }
            </Form.Control.Feedback>
          ) : ''}
        <Button variant="primary" type="submit">Continue</Button>
      </Form>
  </Container>
  );
};

export default DeliveryForm;
