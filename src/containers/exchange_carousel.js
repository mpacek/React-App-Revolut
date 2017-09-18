// TODO: try to split his comntainer to smaller elements

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchWallet,
  updateExchangeCurrencyFrom,
  updateExchangeCurrencyTo,
  updateExchangeRate
} from '../actions/index';
import { Carousel } from 'react-responsive-carousel';
// styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './exchange_carousel.css';

class ExchangeCarousel extends Component {
  constructor (props) {
    super(props);

    this.state = {
      exchangeAmount: "",
      selectedItemFrom: 0,
      selectedItemTo: 0
    };

    this.renderWalletFrom = this.renderWalletFrom.bind(this);
    this.renderWalletTo = this.renderWalletTo.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
  }

  renderWalletFrom(currency) {
    const symbol = currency.symbol;
    const code = currency.code;
    const amount = currency.amount;

    return (
      <article className="exchange-carousel__item" key={code}>
        <h2 className="exchange-carousel__code">{code}</h2>
        <p className="exchange-carousel__wallet">You have {symbol}{amount}</p>
      </article>
    )
  }

  renderWalletTo(currency) {
    const symbol = currency.symbol;
    const code = currency.code;
    const amount = currency.amount;

    let exchangeRate;
    let exchangeAmount;

    if (this.props.exchange.rate !== 1) {
      exchangeRate =
        <span className="exchange-carousel__rate">
          {symbol}1 = {this.getCurrencyObject(code).symbol}{_.round(this.props.exchange.rate, 2)}
        </span>;
    }

    if (!!this.props.exchange.amount !== false && this.props.exchange.rate !== 1) {
      exchangeAmount =
        <div className="exchange-carousel__amount">
          {this.props.exchange.amount > 0 && '+'}{_.round(this.props.exchange.amount * this.props.exchange.rate, 2)}
        </div>;
    }

    return (
      <article className="exchange-carousel__item" key={code}>
        <h2 className="exchange-carousel__code">{code}</h2>
        <p className="exchange-carousel__wallet">You have {symbol}{amount}</p>
        {exchangeRate}
        {exchangeAmount}
      </article>
    )
  }

  getCurrencyObject(code) {
    const index = _.findIndex(this.props.wallet, {"code" : this.props.exchange.exchangeCurrencyFrom});
    return _.get(this.props.wallet, index);
  }

  onChangeFrom(index, element) {
    const currency_code = element.key;
    this.props.updateExchangeCurrencyFrom(currency_code);
    this.updateExchangeRate(currency_code, this.props.exchange.exchangeCurrencyTo);
    this.setState({selectedItemFrom : index});
  }

  onChangeTo(index, element) {
    const currency_code = element.key;
    this.props.updateExchangeCurrencyTo(currency_code);
    this.updateExchangeRate(this.props.exchange.exchangeCurrencyFrom, currency_code);
    this.setState({selectedItemTo : index});
  }

  updateExchangeRate(exchange_from, exchange_to) {
    let executeUpdate = () => {
      console.log('Exchange rate has been updated')
      this.props.updateExchangeRate(exchange_from, exchange_to);
    }
    clearInterval(this.interval);
    executeUpdate();
    this.interval = setInterval(executeUpdate, 10000);
  }

  componentDidMount() {
    this.props.fetchWallet();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if(this.props.wallet.length < 1) {
      return <div>Loading data...</div>;
    }

    return (
      <div className="exchange-carousel">
        <Carousel
          className="exchange-carousel__carousel exchange-carousel__carousel--from"
          onChange={this.onChangeFrom}
          selectedItem={this.state.selectedItemFrom}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          emulateTouch={true}
        >
          {this.props.wallet.map(this.renderWalletFrom)}
        </Carousel>
        <Carousel
          className="exchange-carousel__carousel exchange-carousel__carousel--to"
          onChange={this.onChangeTo}
          selectedItem={this.state.selectedItemTo}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          emulateTouch={true}
        >
          {this.props.wallet.map(this.renderWalletTo)}
        </Carousel>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchWallet,
    updateExchangeCurrencyFrom,
    updateExchangeCurrencyTo,
    updateExchangeRate
  }, dispatch);
}

function mapStateToProps({ wallet, exchange }) {
  return { wallet, exchange };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeCarousel);
