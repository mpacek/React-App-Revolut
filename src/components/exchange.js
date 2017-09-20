import React, { Component } from 'react';
import ExchangeForm from '../containers/exchange_form';
import ExchangeCarousel from '../containers/exchange_carousel';
// styles
import './exchange.css';

export default class Exchange extends Component {
  render() {
    return (
      <div className="exchange">
        <div className="exchange__container">
          <ExchangeForm />
          <ExchangeCarousel />
        </div>
      </div>
    );
  }
}
