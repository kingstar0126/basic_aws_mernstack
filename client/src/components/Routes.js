import React, { useState, useMemo } from 'react';
import { Switch, Router } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import SignUp from './Register/SignUp';
import DeliveryForm from './Register/Delivery';
import ChoosePlan from './Register/ChoosePlan';
import LogIn from './Public/LogIn';
import LogOut from './Public/LogOut';
import Home from './Public/Home';
import UserContext from './Context/UserContext';

import PublicLayoutRoute from './Public/PublicLayout';
import RegisterLayoutRoute from './Register/RegisterLayout';

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
