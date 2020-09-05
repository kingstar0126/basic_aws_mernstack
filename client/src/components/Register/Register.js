import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const SignInForm = () => (
  <div className='container'>
    <Form>
      <h3>Sign up to get started</h3>
      <Form.Group>
        <Form.Label id='formGroupName'>Name</Form.Label>
        <Form.Control />
      </Form.Group>
      <Form.Group id="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group id="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" aria-describedby="passwordHelpBlock" />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long.
        </Form.Text>
      </Form.Group>
      <Link to='/billing'>
        <Button variant="primary" type="submit">Sign In</Button>
      </Link>
    </Form>
  </div>
);

const Billing = () => (
  <div class='container'>
    <section>
      <header>
        <h3>Delivery</h3>
      </header>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>State</Form.Label>
          <Form.Control as="select" defaultValue="Choose...">
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
          <Form.Control />
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
    </section>
    <section>
      <header>
        <h3>Billing</h3>
      </header>
      <Form>

      </Form>
    </section>
  </div>
);

export { SignInForm, Billing };
