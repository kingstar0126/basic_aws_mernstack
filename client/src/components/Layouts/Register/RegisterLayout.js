import React from 'react';
import { Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './Header';

const RegisterLayout = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);

const RegisterLayoutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => (
    <RegisterLayout>
      <Component {...matchProps} />
    </RegisterLayout>
  )} />
);

export default RegisterLayoutRoute;
