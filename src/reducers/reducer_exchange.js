import _ from 'lodash';
import {
  UPDATE_EXCHANGE_CURRENCY_FROM,
  UPDATE_EXCHANGE_CURRENCY_TO,
  UPDATE_EXCHANGE_RATE,
  UPDATE_AMOUNT
} from '../actions';

// TODO: get default/active currencies from the api
const initialState = {
  currencyFrom: 'USD',
  currencyTo: 'GBP',
  rate: 0,
  amount: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
  case UPDATE_EXCHANGE_CURRENCY_FROM:
    return {
      ...state,
      currencyFrom: action.payload
    };
  case UPDATE_EXCHANGE_CURRENCY_TO:
    return {
      ...state,
      currencyTo: action.payload
    };
  case UPDATE_EXCHANGE_RATE:
    return {
      ...state,
      rate: _.values(action.payload.data.rates)[0]
    };
  case UPDATE_AMOUNT:
    return {
      ...state,
      amount: action.payload
    };
  default:
    return state;
  }
}
