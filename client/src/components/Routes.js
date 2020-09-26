import React, { useEffect, useState } from 'react';
import { Switch, Router, useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import SignUp from './Authentication/SignUp';
import Billing from './Billing/Billing';
import ChoosePlan from './Plans/ChoosePlan';
import LogIn from './Authentication/LogIn';
import LogOut from './Authentication/LogOut';
import Home from './Homepage/Home';
import UserContext from '../context/UserContext';
import UserMenu from './UserMenu/UserMenu';

import PublicLayoutRoute from './Layouts/Public/PublicLayout';
import RegisterLayoutRoute from './Layouts/Register/RegisterLayout';

const Menu = () => (
  <>
    <div>MENU</div>
  </>
);

/** Defines all routes based on their layouts
 * Passes history prop to all routes using useHistory hook
 * Sets UserContext
 * */
const Routes = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const c = new Cookies();
    const cookie = c.get('token');
    if (cookie) setUser(cookie);
  }, []);

  return (
      <Router history={history}>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <PublicLayoutRoute exact path='/' component={Home} />
            <PublicLayoutRoute exact path='/menu' component={Menu} />
            <PublicLayoutRoute exact path='/login' component={LogIn} />
            <PublicLayoutRoute exact path='/logout' component={LogOut} />
            <PublicLayoutRoute exact path='/user/menu' component={UserMenu} />

            <RegisterLayoutRoute exact path='/signin' component={SignUp} />
            <RegisterLayoutRoute exact path='/billing' component={Billing} />
            <RegisterLayoutRoute exact path='/choosePlan' component={ChoosePlan} />
          </Switch>
        </UserContext.Provider>
      </Router>
  );
};

export default Routes;
