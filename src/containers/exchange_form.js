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
      currentSlide: 0
    };
  }

  componentDidMount() {
    this.props.fetchWallet();
  }

  renderWallet(currency) {
    const symbol = currency.symbol;
    const name = currency.currency_name;
    const amount = currency.amount;

    return (
      <div key={_.uniqueId()}>
        <p>{name}{amount}{symbol}</p>
      </div>
    )
  }

  render() {
    if(this.props.wallet.length < 1) {
      return <div>Loading data...</div>;
    }

    return (
      <div>
        <Carousel selectedItem={this.state.currentSlide} onChange={(index, element) => {console.log(index + element) }} showThumbs={false} showStatus={false} showArrows={false}>
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
