import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import './Billing.css';

/** Gets the user's delivery information */
const Billing = ({ history }) => {
  const [formState, setFormState] = useState({
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // Make request to create a new PaymentIntent
  useEffect(() => {
    const stripeReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('/create-payment-intent', stripeReq)
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => setError(error.toString()));
  }, []);

  /** Handles form submition by calling API in backend */
  const handleBilling = (event) => {
    event.preventDefault();

    setLoading(true);
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
        response.json().then(async (data) => {
          if (data.error) setError(data.error); // http response error
          else {
            // complete payment
            const payload = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: elements.getElement(CardElement),
              },
            });
            if (payload.error) {
              setError(`Payment failed ${payload.error.message}`);
            } else {
              setLoading(false);
              console.log(payload);
            }
            history.push('/');
          }
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

  /** Sets stripe's card state when changed by user */
  const handleCardChange = (event) => {
    setError(event.error ? event.error.message : '');
  };

  return (
    <Container className='my-5 billingForm'>
      <h2 className='my-3'>Your Delivery Information</h2>
      <Form onSubmit={handleBilling}>
        <Form.Row>
          <Form.Group as={Col} xs='auto' md='6'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              name='address'
              defaultValue='77 Awesome Street'
              onChange={handleChange}
              disabled />
          </Form.Group>
          <Form.Group as={Col} xs='auto' md='6'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name='phone'
              onChange={handleChange}
              defaultValue='(123)123-1234'
              disabled />
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
          <Form.Group as={Col} xs='12'>
            <Form.Label>Card details</Form.Label>
            <CardElement id='cardElement' onChange={handleCardChange} />
          </Form.Group>
        </Form.Row>
        {error && (
          <Form.Control.Feedback type='invalid' className='d-block'>
            {error}
          </Form.Control.Feedback>
        )}
        <Button variant='primary' type='submit' disabled={loading}>Confirm and Pay</Button>
        {loading
          && <Spinner animation='border' role='status' size='sm' className='ml-2'>
               <span className="sr-only">Loading...</span>
             </Spinner>}
      </Form>
    </Container>
  );
};

export default Billing;
