import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Footer from '../../Footer/Footer';

import './public.css';

const PublicLayout = ({ children }) => (
  <div>
    <Header />
      <div className='body'>
        {children}
      </div>
    <Footer />
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
