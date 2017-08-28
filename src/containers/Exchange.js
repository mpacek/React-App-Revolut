import React, { Component } from 'react';
import ExchangeForm from '../components/ExchangeForm';
import './Exchange.css';

const wallet = [
  {
    currency: "GBP",
    symbol: "£",
    amount: "100"
  },
  {
    currency: "USD",
    symbol: "$",
    amount: "50"
  },
  {
    currency: "EUR",
    symbol: "€",
    amount: "200"
  }
];

class Exchange extends Component {
  constructor() {
    super();

    this.state = {
      exchange: {
        from: {
          currency: "GBP",
          amount: 0
        },
        to: {
          currency: "EUR",
          amount: 0
        },
        exchangeRate: 0.65
      },
    };
  }

  render() {
    return (
      <div className="Exchange">
        <h1 className="Exchange__title u-visibilityhidden">Exchange: </h1>
        <ExchangeForm wallet={wallet} exchangeDetails={this.state.exchange} />
      </div>
    );
  }
}

export default Exchange;
