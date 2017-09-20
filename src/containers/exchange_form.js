import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateAmountFrom,
  updateWallet
} from '../actions/index';
// styles
import './exchange_form.css';

class ExchangeForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      message: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChangeFrom = this.onInputChangeFrom.bind(this);
  }

  onInputChangeFrom(event) {
    const formAmountFrom = event.target.value;
    const { wallet, exchange } = this.props;
    const walletAmoutFrom = wallet[exchange.currencyFrom].amount;
    const walletAmoutFromSymbol = wallet[exchange.currencyFrom].symbol;
    const rangeMin = _.round(walletAmoutFrom);
    const rangeMax = _.round(walletAmoutFrom / exchange.rate, 2);

    // form validation
    if (_.inRange(formAmountFrom, -1 * rangeMin, rangeMax)) {
      this.props.updateAmountFrom(formAmountFrom);
      this.updateMessage();
    } else {
      const message = `
        You can sell maximum ${rangeMin}${walletAmoutFromSymbol},
        and buy maximum ${rangeMax}${walletAmoutFromSymbol}
      `;
      this.updateMessage(message);
    }
  }

  updateMessage(message) {
    if(message) {
      this.setState({ message });
    } else {
      this.setState({ message: '' });
    }
  }

  onSubmit(event) {
    const { wallet, exchange } = this.props;
    const newWalletFrom = _.sum([_.toNumber(wallet[exchange.currencyFrom].amount), _.toNumber(exchange.amountFrom)]);

    event.preventDefault();
    console.log(wallet[exchange.currencyFrom].code + ',' + newWalletFrom);
    this.props.updateWallet(wallet[exchange.currencyFrom].code, newWalletFrom)
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

  render() {
    let exchangeAmount;
    const { exchange: { amountFrom, rate } } = this.props;

    if (!!amountFrom !== false) {
      exchangeAmount =
        <div className="exchange-form__input exchange-form__input--to">
          {amountFrom < 0 && '+'}{_.round(-1 * amountFrom * rate, 2)}
        </div>;
    }

    return (
      <div className="exchange-form">
        <form onSubmit={this.onSubmit} className="exchange-form__form">
          <input
            ref="input"
            type="number"
            className="exchange-form__input exchange-form__input--from"
            value={this.props.exchange.amountFrom}
            onChange={this.onInputChangeFrom}
            autoFocus
          />
          {exchangeAmount}
        </form>
        <div className="exchange-form__message">
          {this.state.message}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAmountFrom,
    updateWallet
  }, dispatch);
}

function mapStateToProps({ wallet, exchange }) {
  return { wallet, exchange };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
