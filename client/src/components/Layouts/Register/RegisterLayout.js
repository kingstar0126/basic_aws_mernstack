import React from 'react';
import { Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './Header';

const stripePromise = loadStripe('pk_test_51HRpxMFseyHrAR6RPpGwfSddqA1w7v87HBP8Ew3Xm7BN4iqcc1yDJoxWIXMgkt6KfURcHzKGFCJhJKgGQqldNU3j00kcWOtSBC');

const RegisterLayout = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);

const RegisterLayoutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => (
    <RegisterLayout>
      <Elements stripe={stripePromise}>
        <Component {...matchProps} />
      </Elements>
    </RegisterLayout>
  )} />
);

export default RegisterLayoutRoute;
