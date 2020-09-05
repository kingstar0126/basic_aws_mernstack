import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';

const PublicLayout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

const PublicLayoutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => (
    <PublicLayout>
      <Component {...matchProps} />
    </PublicLayout>
  )} />
);

export default PublicLayoutRoute;
