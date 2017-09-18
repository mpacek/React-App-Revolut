import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateAmount
} from '../actions/index';
// styles
import './exchange_form.css';

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
    if (_.inRange(amount, -10000, 10000)) {
      this.setState({ amount });
      this.props.updateAmount(amount);
    }
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

  render() {

    return (
      <div className="exchange-form">
        <form className="exchange-form__form">
          <input
            ref="input"
            type="number"
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
