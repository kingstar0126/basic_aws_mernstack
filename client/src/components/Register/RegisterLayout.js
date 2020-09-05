import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';

const RegisterLayout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

const RegisterLayoutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => (
    <RegisterLayout>
      <Component {...matchProps} />
    </RegisterLayout>
  )} />
);

export default RegisterLayoutRoute;
