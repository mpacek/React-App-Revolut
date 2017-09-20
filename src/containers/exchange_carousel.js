// TODO: try to split his comntainer to smaller elements

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchWallet,
  updatecurrencyFrom,
  updatecurrencyTo,
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
      selectedItemFrom: 0,
      selectedItemTo: 1
    };

    this.renderWalletFrom = this.renderWalletFrom.bind(this);
    this.renderWalletTo = this.renderWalletTo.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
  }

  renderWalletFrom(currency) {
    const { symbol, code, amount } = currency;

    return (
      <article className="exchange-carousel__item" key={code}>
        <h2 className="exchange-carousel__code">{code}</h2>
        <p className="exchange-carousel__wallet">You have {symbol}{amount}</p>
      </article>
    )
  }

  renderWalletTo(currency) {
    const { symbol, code, amount } = currency;
    const { wallet, exchange } = this.props;

    let exchangeRate;

    if (this.props.exchange.rate !== 1) {
      exchangeRate =
        <span className="exchange-carousel__rate">
          {symbol}
          1 = {wallet[exchange.currencyFrom].symbol}
          {_.round(exchange.rate, 2)}
        </span>;
    }

    return (
      <article className="exchange-carousel__item" key={code}>
        <h2 className="exchange-carousel__code">{code}</h2>
        <p className="exchange-carousel__wallet">You have {symbol}{_.round(amount, 2)}</p>
        {exchangeRate}
      </article>
    )
  }

  onChangeFrom(index, element) {
    const currency_code = element.key;
    this.props.updatecurrencyFrom(currency_code);
    this.startUpdateExchangeRate();
    this.setState({selectedItemFrom : index});
  }

  onChangeTo(index, element) {
    const currency_code = element.key;
    this.props.updatecurrencyTo(currency_code);
    this.startUpdateExchangeRate();
    this.setState({selectedItemTo : index});
  }

  startUpdateExchangeRate() {
    let executeUpdate = () => {
      console.log('Exchange rate has been updated')
      this.props.updateExchangeRate(this.props.exchange.currencyFrom, this.props.exchange.currencyTo);
    }
    clearInterval(this.interval);
    executeUpdate();
    this.interval = setInterval(executeUpdate, 10000);
  }

  componentDidMount() {
    this.props.fetchWallet();
    this.startUpdateExchangeRate();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if(_.size(this.props.wallet) < 1) {
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
          {_.map(this.props.wallet, this.renderWalletFrom)}
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
          {_.map(this.props.wallet, this.renderWalletTo)}
        </Carousel>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchWallet,
    updatecurrencyFrom,
    updatecurrencyTo,
    updateExchangeRate
  }, dispatch);
}

function mapStateToProps({ wallet, exchange }) {
  return { wallet, exchange };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeCarousel);
