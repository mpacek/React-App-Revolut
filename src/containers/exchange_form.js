import _ from 'lodash';
import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWallet } from '../actions/index';
import './exchange_form.css';

class ExchangeForm extends Component {
  componentDidMount() {
    this.props.fetchWallet();
  }

  render() {
    if(!this.props.wallet) {
      return <div>Loading data...</div>;
    }

    return (
      <div>
        {this.props.wallet.map(this.renderWallet)}
      </div>
    )
  }

  renderWallet(currency) {
    const name = currency.symbol;

    return (
      <div key={_.uniqueId()}>
        {name}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWallet }, dispatch);
}

function mapStateToProps({ wallet }) {
  return { wallet };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
