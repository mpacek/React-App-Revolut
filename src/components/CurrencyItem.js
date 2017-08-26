import React from 'react';

export default function CurrencyItem(props) {
    return (
      <div className="CurrencyItem">
        <p>
          <strong> { props.transfer.amount } { props.transfer.currency } </strong> <br />
          you have: { props.transfer.symbol }{ props.transfer.inWallet } <br />
          <small> 1{ props.transfer.symbol } = { props.transfer.exchangeRate } </small>
        </p>
      </div>
    );
}
