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

    this.renderWallet = this.renderWallet.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
  }

  renderWallet(currency) {
    const symbol = currency.symbol;
    const code = currency.code;
    const amount = currency.amount;

    return (
      <article className="exchange-form__item" key={code}>
        <h2 className="exchange-form__code">{code}</h2>
        <p className="exchange-form__amount">You have {symbol}{amount}</p>
      </article>
    )
  }

  onChangeFrom(index, element) {
    let currency_code = element.key;
    this.props.updateExchangeCurrencyFrom(currency_code);
    this.updateExchangeRate(currency_code, this.props.exchange.exchangeCurrencyTo);
    this.setState({selectedItemFrom : index});
  }

  onChangeTo(index, element) {
    let currency_code = element.key;
    this.props.updateExchangeCurrencyTo(currency_code);
    this.updateExchangeRate(this.props.exchange.exchangeCurrencyFrom, currency_code);
    this.setState({selectedItemTo : index});
  }

  updateExchangeRate(exchange_from, exchange_to) {
    clearInterval(this.interval);
    let executeUpdate = () => {
      console.log('Exchange rate has been updated')
      this.props.updateExchangeRate(exchange_from, exchange_to);
    }
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
          className="exchange-form__carousel exchange-form__carousel--from"
          onChange={this.onChangeFrom}
          selectedItem={this.state.selectedItemFrom}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          emulateTouch={true}
        >
          {this.props.wallet.map(this.renderWallet)}
        </Carousel>
        <Carousel
          className="exchange-form__carousel exchange-form__carousel--to"
          onChange={this.onChangeTo}
          selectedItem={this.state.selectedItemTo}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          emulateTouch={true}
        >
          {this.props.wallet.map(this.renderWallet)}
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
