import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWallet } from '../actions/index';
import { Carousel } from 'react-responsive-carousel';
// Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './exchange_form.css';

class ExchangeForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currencyExchangeFrom: 0,
      currencyExchangeTo: 0
    };

    this.setExchangeCurrencyFrom = this.setExchangeCurrencyFrom.bind(this);
    this.setExchangeCurrencyTo = this.setExchangeCurrencyTo.bind(this);
  }

  renderWallet(currency) {
    const symbol = currency.symbol;
    const code = currency.code;
    const amount = currency.amount;

    return (
      <div key={_.uniqueId()}>
        <p>{code}{amount}{symbol}</p>
      </div>
    )
  }

  setExchangeCurrencyFrom(index, element) {
    if (index !== this.state.currencyExchangeFrom) {
      this.setState({
        currencyExchangeFrom : index
      });
    }
  }

  setExchangeCurrencyTo(index, element) {
    if (index !== this.state.currencyExchangeTo) {
      this.setState({
        currencyExchangeTo : index
      });
    }
  }

  componentDidMount() {
    this.props.fetchWallet();
  }

  render() {
    if(this.props.wallet.length < 1) {
      return <div>Loading data...</div>;
    }

    return (
      <div>
        <Carousel selectedItem={this.state.currencyExchangeFrom} onChange={this.setExchangeCurrencyFrom} showThumbs={false} showStatus={false} showArrows={false}>
          {this.props.wallet.map(this.renderWallet)}
        </Carousel>
        <Carousel selectedItem={this.state.currencyExchangeTo} onChange={this.setExchangeCurrencyTo} showThumbs={false} showStatus={false} showArrows={false}>
          {this.props.wallet.map(this.renderWallet)}
        </Carousel>
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
