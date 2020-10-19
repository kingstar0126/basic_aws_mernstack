import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Cookies } from 'react-cookie';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import ToPay from './ToPay';
import './Billing.css';

/** Gets the user's delivery information */
const Billing = ({ history }) => {
  const [formState, setFormState] = useState({
    address: '77 Awesome Street',
    phone: '(123)123-4567',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  /** Make request to create a new PaymentIntent */
  useEffect(() => {
    const cookies = new Cookies();
    const stripeReq = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cookies.get('userPlan')),
    };
    fetch('/api/create-payment-intent', stripeReq)
      .then((res) => {
        res.json().then((data) => {
          if (data.error) setError(data.error);
          else setClientSecret(data.clientSecret); // set cookie with client secret (Stripe)
        });
      })
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
            if (payload.error) setError(`Payment failed ${payload.error.message}`);
            else {
              setLoading(false);
              history.push('/user/thisWeek');
            }
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
    setLoading(false);
    setError(event.error ? event.error.message : '');
  };

  return (
    <Container className='my-5 billingForm'>
      <ToPay history={history} />
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
            <Form.Control name='state' as='select' onChange={handleChange} >
              <option>Choose...</option>
              <option value='AZ'>Arizona</option>
              <option value='CA'>California</option>
              <option value='CT'>Connecticut</option>
              <option value='FL'>Florida</option>
              <option value='NV'>Nevada</option>
              <option value='NM'>New Mexico</option>
              <option value='NY'>New York</option>
              <option value='OR'>Oregon</option>
              <option value='TX'>Texas</option>
              <option value='WA'>Washington</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs='auto' md='3'>
            <Form.Label>Zip</Form.Label>
            <Form.Control name='zip' minLength='5' maxLength='5' onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} xs='12'>
            <Form.Label>Card details</Form.Label>
            <OverlayTrigger
              placement='bottom'
              trigger={['hover', 'focus', 'click']}
              delay={{ show: 250, hide: 30000 }}
              overlay={
                <Popover>
                  <Popover.Content>Type: 4242 4242 4242 4242</Popover.Content>
                </Popover>
              }
            ><CardElement id='cardElement' onChange={handleCardChange} />
            </OverlayTrigger>
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
               <span className='sr-only'>Loading...</span>
             </Spinner>}
      </Form>
    </Container>
  );
};

export default Billing;
