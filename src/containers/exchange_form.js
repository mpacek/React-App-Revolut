import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateAmountFrom
} from '../actions/index';
// styles
import './exchange_form.css';

class ExchangeForm extends Component {
  constructor (props) {
    super(props);

    this.onInputChangeFrom = this.onInputChangeFrom.bind(this);
  }

  onInputChangeFrom(event) {
    const amountFrom = event.target.value;
    const { wallet, exchange } = this.props;
    const rangeMin = -1 * wallet[exchange.currencyFrom].amount;
    const rangeMax = wallet[exchange.currencyTo].amount / exchange.rate;

    if (_.inRange(amountFrom, rangeMin, rangeMax)) {
      this.props.updateAmountFrom(amountFrom);
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
        <form className="exchange-form__form">
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
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAmountFrom
  }, dispatch);
}

function mapStateToProps({ wallet, exchange }) {
  return { wallet, exchange };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
