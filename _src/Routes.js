import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Exchange from './containers/Exchange';
import NotFound from './containers/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Exchange} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
);
