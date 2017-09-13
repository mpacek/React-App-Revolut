import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './CurrencyItem.css';

export default class CurrencyItem extends React.Component {
  componentWillMount() {
    this.id = "CI" + _.uniqueId()
  }

  render() {
    const { exchangeDetails } = this.props;
    const exchangeRate = this._displayExchangeRate();

    return (
      <fieldset className={"CurrencyItem " + (exchangeDetails.currency == this.props.currency ? 'CurrencyItem__active' : '')}>
        <div className="CurrencyItem__operation">
          <label htmlFor={this.id} className="CurrrencyItem__currency">
            {this.props.currency}
          </label>
          <input id={this.id} className="CurrrencyItem__amount" value={exchangeDetails.amount} />
        </div>
        <div className="CurrencyItem__info">
          <p className="CurrrencyItem__amount">
            You have: {this.props.symbol}{this.props.amount}
          </p>
          {exchangeRate}
        </div>
      </fieldset>
    );
  }

  _displayExchangeRate() {
    if (this.props.exchangeRate) {
      return <p className="CurrrencyItem__rate">1{this.props.symbol} = {this.props.exchangeRate}</p>;
    }
  }
}

CurrencyItem.propTypes = {
  exchangeDetails: PropTypes.any.isRequired,
  exchangeRate: PropTypes.node
}
