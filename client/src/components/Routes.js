import React, { useState, useMemo } from 'react';
import { Switch, Router, useHistory } from 'react-router-dom';
import SignUp from './Authentication/SignUp';
import DeliveryForm from './Billing/Delivery';
import ChoosePlan from './Plans/ChoosePlan';
import LogIn from './Authentication/LogIn';
import LogOut from './Authentication/LogOut';
import Home from './Homepage/Home';
import UserContext from '../context/UserContext';

import PublicLayoutRoute from './Layouts/Public/PublicLayout';
import RegisterLayoutRoute from './Layouts/Register/RegisterLayout';

const Menu = () => (
  <>
    <div>MENU</div>
  </>
);

const Routes = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  // const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]); */

  return (
      <Router history={history}>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <PublicLayoutRoute exact path='/' component={Home} />
            <PublicLayoutRoute exact path='/menu' component={Menu} />
            <PublicLayoutRoute exact path='/login' component={LogIn} />
            <PublicLayoutRoute exact path='/logout' component={LogOut} />

            <RegisterLayoutRoute exact path='/signin' component={SignUp} />
            <RegisterLayoutRoute exact path='/delivery' component={DeliveryForm} />
            <RegisterLayoutRoute exact path='/choosePlan' component={ChoosePlan} />
          </Switch>
        </UserContext.Provider>
      </Router>
  );
};

export default Routes;
