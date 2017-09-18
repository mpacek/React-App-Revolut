import React, { Component } from 'react';
import ExchangeForm from '../containers/exchange_form';
import ExchangeCarousel from '../containers/exchange_carousel';
// styles
import './app.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app__container">
          <ExchangeForm />
          <ExchangeCarousel />
        </div>
      </div>
    );
  }
}
