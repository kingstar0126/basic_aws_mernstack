import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { SignInForm, Billing } from './Register/Register';

import PublicLayoutRoute from './Public/PublicLayout';
import RegisterLayoutRoute from './Register/RegisterLayout';

const Home = () => (
    <>
      <p>Homepage</p>
    </>
);

const Menu = () => (
  <>
  <div>MENU</div>
  </>
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicLayoutRoute exact path='/' component={Home} />
      <PublicLayoutRoute exact path='/menu' component={Menu} />

      <RegisterLayoutRoute exact path='/signin' component={SignInForm} />
      <RegisterLayoutRoute exact path='/billing' component={Billing} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
