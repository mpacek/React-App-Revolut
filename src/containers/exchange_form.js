import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateAmount
} from '../actions/index';

class ExchangeForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      amount: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    let amount = event.target.value;
    this.setState({ amount });
    this.props.updateAmount(amount);
  }

  render() {

    return (
      <div>
        <form className="exchange-form__form">
          <input
            className="exchange-form__input"
            value={this.state.amount}
            onChange={this.onInputChange}
            autoFocus
          />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAmount
  }, dispatch);
}

function mapStateToProps({ wallet, exchange }) {
  return { wallet, exchange };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
