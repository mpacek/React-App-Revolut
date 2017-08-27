import React from 'react';
import CurrencyItem from '../components/CurrencyItem';

export default class ExchangeForm extends React.Component {
  constructor() {
    super();

    this.state = {
      exchange: {
        from: {
          currency: "GBP",
          symbol: "£",
          exchangeRate: 0,
          amount: 0,
          amountInWallet: 100
        },
        to: {
          currency: "EUR",
          symbol: "€",
          exchangeRate: 0,
          amount: 0,
          amountInWallet: 200
        }
      },
    };
  }

  render() {
    return (
      <form className="ExchangeForm">
        <CurrencyItem transfer={this.state.exchange.from} />
        <CurrencyItem transfer={this.state.exchange.to} />
      </form>
    );
  }
}
