import React from 'react';
import PropTypes from 'prop-types';
import CurrencyItem from '../components/CurrencyItem';
import './ExchangeForm.css';

export default class ExchangeForm extends React.Component {
  render() {
    const currenciesFrom = this._getCurrenciesFrom();
    const currenciesTo = this._getCurrenciesTo();

    return (
      <form className="ExchangeForm">
        <div className="ExchangeForm__from">
          {currenciesFrom}
        </div>
        <div className="ExchangeForm__to">
          {currenciesTo}
        </div>
      </form>
    );
  }

  _getCurrenciesFrom() {
    const { exchangeDetails, wallet } = this.props;
    return wallet.map((w) => {
      return <CurrencyItem
        { ...w }
        exchangeDetails={exchangeDetails.from}
        key = {w.id} />
    })
  }

  _getCurrenciesTo() {
    const { exchangeDetails, wallet } = this.props;
    return wallet.map((w) => {
      return <CurrencyItem
        { ...w }
        exchangeDetails={exchangeDetails.to}
        exchangeRate={exchangeDetails.exchangeRate}
        key = {w.id} />
    })
  }
}

CurrencyItem.propTypes = {
  wallet: PropTypes.node,
  exchangeDetails: PropTypes.any.isRequired
}
