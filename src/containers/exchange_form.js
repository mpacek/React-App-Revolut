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

  validateForm(amount) {
    const { wallet, exchange } = this.props;
    const walletAmountFrom = wallet[exchange.currencyFrom].amount;
    const walletAmountFromSymbol = wallet[exchange.currencyFrom].symbol;
    const rangeMin = _.round(walletAmountFrom);
    const rangeMax = _.round(wallet[exchange.currencyTo].amount / exchange.rate, 2);

    if(_.inRange(amount, -1 * rangeMin, rangeMax)) {
      this.updateMessage();
      return true;
    } else {
      const message = `
        You can sell maximum ${rangeMin}${walletAmountFromSymbol},
        and buy maximum ${rangeMax}${walletAmountFromSymbol}
      `;
      this.updateMessage(message);
      return false;
    }
  }

  onInputChangeFrom(event) {
    const formAmountFrom = event.target.value;
    const isValid = this.validateForm(formAmountFrom);

    if(isValid) {
      this.props.updateAmountFrom(formAmountFrom);
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
    event.preventDefault();

    const { wallet } = this.props;
    const { exchange: { currencyFrom, currencyTo, amountFrom, rate } } = this.props;
    const newWalletFrom = _.sum([_.toNumber(wallet[currencyFrom].amount), _.toNumber(amountFrom)]);
    const newWalletTo = _.sum([_.toNumber(wallet[currencyTo].amount), _.toNumber(-1 * amountFrom * rate)]);
    const isValid = this.validateForm(_.toNumber(amountFrom));

    if(isValid && rate !== 1) {
      this.props.updateWallet(wallet[currencyFrom].code, newWalletFrom);
      this.props.updateWallet(wallet[currencyTo].code, newWalletTo);
    }
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
            step="0.01"
            className="exchange-form__input exchange-form__input--from"
            value={this.props.exchange.amountFrom}
            onChange={this.onInputChangeFrom}
            autoFocus
          />
          <button type="submit" className="exchange-form__submit">Exchange</button>
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
