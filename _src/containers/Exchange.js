import React, { Component } from 'react';
import axios from 'axios';
import ExchangeForm from '../components/ExchangeForm';
import './Exchange.css';

const WALLET_API_URL = 'api/wallet.json';

class Exchange extends Component {
  constructor() {
    super();

    this.state = {
      wallet: [],
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

  componentWillMount() {
    this._fetchWallet();
  }

  render() {
    return (
      <div className="Exchange">
        <h1 className="Exchange__title u-visibilityhidden">Exchange: </h1>
        <ExchangeForm wallet={this.state.wallet} exchangeDetails={this.state.exchange} />
      </div>
    );
  }

  _fetchWallet() {
    axios.get(WALLET_API_URL).then(response => {
      this.setState({wallet: response.data});
    });
  }
}

export default Exchange;
