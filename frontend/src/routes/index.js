import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/signIn';
import SignUp from '~/pages/signUp';

import Dashboard from '~/pages/dashboard';
import Details from '~/pages/details';
import Profile from '~/pages/profile';

export default () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    <Route path="/register" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivete />
    <Route path="/details" component={Details} isPrivete />
    <Route path="/profile" component={Profile} isPrivete />

    <Route path="/" component={() => <h1>404 - Page not found</h1>} />
  </Switch>
);
