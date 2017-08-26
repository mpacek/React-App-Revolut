import React, { Component } from 'react';
import CurrencyItem from '../components/CurrencyItem';
import './ExchangeForm.css';

class ExchangeForm extends Component {
  constructor() {
    super();

    this.state = {
      transfer: {
        from: {
          currency: "GBP",
          symbol: "£",
          exchangeRate: 0,
          amount: 0,
          inWallet: 100
        },
        to: {
          currency: "EUR",
          symbol: "€",
          exchangeRate: 0,
          amount: 0,
          inWallet: 200
        }
      },
      wallet: [
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
      ]
    };
  }

  render() {
    return (
      <div className="ExchangeForm">
        <div className="lander">
          <h1>Exchange: </h1>
          <div>
            <CurrencyItem transfer={this.state.transfer.from} />
            <CurrencyItem transfer={this.state.transfer.to} />
          </div>
        </div>
      </div>
    );
  }
}

export default ExchangeForm;
