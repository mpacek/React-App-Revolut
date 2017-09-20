import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RedeuxPromise from 'redux-promise';

import Exchange from './components/exchange';
import NotFound from './components/not_found';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(RedeuxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Exchange} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
