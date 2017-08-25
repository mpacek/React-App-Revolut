import React, { Component } from 'react';
import CurrencyItem from '../components/CurrencyItem';
import './ExchangeForm.css';

class ExchangeForm extends Component {
  constructor() {
    super();

    this.state = {
      currentTransfer: {
        from: {
          currency: "GBP",
          exchangeRate: 0,
          amount: 0
        },
        to: {
          currency: "EUR",
          exchangeRate: 0,
          amount: 0
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
          <h1>Revolut</h1>
          <p>Web Development Home Task</p>
          <ul>
            <CurrencyItem />
          </ul>
        </div>
      </div>
    );
  }
}

export default ExchangeForm;
