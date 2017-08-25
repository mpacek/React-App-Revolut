import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ExchangeForm from './containers/ExchangeForm';
import NotFound from './containers/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={ExchangeForm} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
);
