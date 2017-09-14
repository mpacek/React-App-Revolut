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
      exchangeCurrencyFrom: 1,
      exchangeCurrencyTo: 0,
      exchangeRate: null,
      exchangeAmount: ""
    };

    this.updateCurrencyFrom = this.updateCurrencyFrom.bind(this);
    this.updateCurrencyTo = this.updateCurrencyTo.bind(this);
    this.renderWalletFrom = this.renderWalletFrom.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ exchangeAmount: event.target.value });
  }

  renderWalletFrom(currency) {
    const symbol = currency.symbol;
    const code = currency.code;
    const amount = currency.amount;

    return (
      <article className="exchange-form__item" key={_.uniqueId()}>
        <h2 className="exchange-form__code">{code}</h2>
        <p className="exchange-form__amount">You have {symbol}{amount}</p>
        <input
          className="exchange-form__input"
          value={this.state.exchangeAmount}
          onChange={this.onInputChange}
        />
      </article>
    )
  }

  renderWalletTo(currency) {
    const symbol = currency.symbol;
    const code = currency.code;
    const amount = currency.amount;

    return (
      <article className="exchange-form__item" key={_.uniqueId()}>
        <h2 className="exchange-form__item__code">{code}</h2>
        <p className="exchange-form__item__amount">You have {symbol}{amount}</p>
      </article>
    )
  }

  updateCurrencyFrom(index, element) {
    if (index !== this.state.exchangeCurrencyFrom) {
      this.setState({
        exchangeCurrencyFrom: index,
        exchangeAmount: ""
      });
    }
  }

  updateCurrencyTo(index, element) {
    if (index !== this.state.exchangeCurrencyTo) {
      this.setState({
        exchangeCurrencyTo: index
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

    console.log(this.state);

    return (
      <div className="exchange-form">
        <Carousel className="exchange-form__carousel exchange-form__carousel--from" selectedItem={this.state.exchangeCurrencyFrom} onChange={this.updateCurrencyFrom} showThumbs={false} showStatus={false} showArrows={false}>
          {this.props.wallet.map(this.renderWalletFrom)}
        </Carousel>
        <Carousel className="exchange-form__carousel exchange-form__carousel--to" selectedItem={this.state.exchangeCurrencyTo} onChange={this.updateCurrencyTo} showThumbs={false} showStatus={false} showArrows={false}>
          {this.props.wallet.map(this.renderWalletTo)}
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
