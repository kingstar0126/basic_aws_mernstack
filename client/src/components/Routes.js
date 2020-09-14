import React from 'react';
import { Switch, Router } from 'react-router-dom';
import SignUp from './Register/SignUp';
import DeliveryForm from './Register/Delivery';
import ChoosePlan from './Register/ChoosePlan';
import Home from './Public/Home';
import { createBrowserHistory as createHistory } from 'history'

import PublicLayoutRoute from './Public/PublicLayout';
import RegisterLayoutRoute from './Register/RegisterLayout';

const history = createHistory();

const Menu = () => (
  <>
    <div>MENU</div>
  </>
);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <PublicLayoutRoute exact path='/' component={Home} />
      <PublicLayoutRoute exact path='/menu' component={Menu} />

      <RegisterLayoutRoute exact path='/signin' component={SignUp} />
      <RegisterLayoutRoute exact path='/delivery' component={DeliveryForm} />
      <RegisterLayoutRoute exact path='/choosePlan' component={ChoosePlan} />
    </Switch>
  </Router>
);

export default Routes;