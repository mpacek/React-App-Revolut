import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExchangeForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      amount: ''
    };
  }

  render() {
    return (
      <div>
        <form className="exchange-form__form">
          <input
            className="exchange-form__input"
            value={this.state.amount}
            onChange={this.onInputChange}
          />
        </form>
        {console.log(this.props.exchange)}
      </div>
    )
  }
}

function mapStateToProps({ wallet, exchange }) {
  return { wallet, exchange };
}

export default connect(mapStateToProps)(ExchangeForm);
