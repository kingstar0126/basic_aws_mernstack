import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/** User's delivery information component */
const DeliveryForm = ({ history }) => {
  const [formState, setFormState] = useState({
    address: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState('');
  
  /** Handles form submition */
  const handleDelivery = (event) => {
    event.preventDefault();

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    }; 
    fetch('http://localhost:5000/api/users/delivery', request)
      .then((response) => {
        // http response error
        response.json().then((data) => {
          if (data.error) setError(data.error);
          else history.push('/choosePlan'); // go to /choosePlan on success
        })
      })
      .catch((error) => {
        console.log('An error happened', error);
        setError(error);
      }) //network error 
  }

  /** Handles form's input fields */
  const handleChange = (event) => {
    const key = event.target.name;
    setFormState({ ...formState, [key]: event.target.value});
  }

  return (
    <div className='container'>
    <section>
      <header>
        <h3>Delivery</h3>
      </header>
      <Form onSubmit={handleDelivery}>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>Address</Form.Label>
            <Form.Control name='address' onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control name='phone' onChange={handleChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control name='city' onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col}>
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

          <Form.Group as={Col}>
            <Form.Label>Zip</Form.Label>
            <Form.Control name='zip' minLength='5' onChange={handleChange} />
          </Form.Group>
        </Form.Row>
        {error.length ?
          <Form.Control.Feedback type='invalid' className='d-block'>{ error.length ? error : '' }</Form.Control.Feedback> :
        ''}
        <Button variant="primary" type="submit">Continue</Button>
      </Form>
    </section>
  </div>
  )
};

export default DeliveryForm;
