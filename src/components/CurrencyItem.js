import React from 'react';
import _ from 'lodash';

export default class CurrencyItem extends React.Component {
  componentWillMount() {
    this.id = "CI" + _.uniqueId()
  }
  
  render() {
    return (
      <fieldset className="CurrencyItem">
        <div className="CurrencyItem__operation">
          <label htmlFor={this.id} className="CurrrencyItem__cuurency">
            {this.props.transfer.currency}
          </label>
          <input id={this.id} className="CurrrencyItem__amount" value={this.props.transfer.amount} />
        </div>
        <div className="CurrencyItem__info">
          <p className="CurrrencyItem__amount">
            You have: {this.props.transfer.symbol}{this.props.transfer.amountInWallet}
          </p>
          <p className="CurrrencyItem__amount">
            1{this.props.transfer.symbol} = {this.props.transfer.exchangeRate}
          </p>
        </div>
      </fieldset>
    );
  }
}
