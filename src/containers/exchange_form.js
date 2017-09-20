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

    this.state = {
      amountFrom: ''
    };

    this.onInputChangeFrom = this.onInputChangeFrom.bind(this);
  }

  onInputChangeFrom(event) {
    const amountFrom = event.target.value;
    if (_.inRange(amountFrom, -10000, 10000)) {
      this.setState({ amountFrom });
      this.props.updateAmountFrom(amountFrom);
    }
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

  render() {
    let exchangeAmount;
    const { exchange: { amount, rate } } = this.props;

    if (!!amount !== false) {
      exchangeAmount =
        <div className="exchange-form__input exchange-form__input--to">
          {amount < 0 && '+'}{-1 * _.round(amount * rate, 2)}
        </div>;
    }

    return (
      <div className="exchange-form">
        <form className="exchange-form__form">
          <input
            ref="input"
            type="number"
            className="exchange-form__input exchange-form__input--from"
            value={this.state.amountFrom}
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
