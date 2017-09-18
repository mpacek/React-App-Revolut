// TODO: split action to different files

import axios from 'axios';

const WALLET_API_URL = "api/wallet.json";

export const FETCH_WALLET = 'FETCH_WALLET';

export function fetchWallet() {
  const url = WALLET_API_URL;
  const request = axios.get(url);

  return {
    type: FETCH_WALLET,
    payload: request
  }
}

const EXCHANGE_API_URL = "https://openexchangerates.org/api/latest.json";
const EXCHANGE_API_ID = "8b38a6b9bc064adcb16d2420457323c7";

export const UPDATE_EXCHANGE_RATE = 'UPDATE_EXCHANGE_RATE';

export function updateExchangeRate(exchange_from, exchange_to) {
  // TODO: in free plan of openexchangerates the base currency can be only USD
  const url =`${EXCHANGE_API_URL}?app_id=${EXCHANGE_API_ID}&symbols=${exchange_to}`;
  const request = axios.get(url);

  return {
    type: UPDATE_EXCHANGE_RATE,
    payload: request
  }
}

export const UPDATE_EXCHANGE_CURRENCY_FROM = 'UPDATE_EXCHANGE_CURRENCY_FROM';

export function updateExchangeCurrencyFrom(currency) {
  return {
    type: UPDATE_EXCHANGE_CURRENCY_FROM,
    payload: currency
  }
}

export const UPDATE_EXCHANGE_CURRENCY_TO = 'UPDATE_EXCHANGE_CURRENCY_TO';

export function updateExchangeCurrencyTo(currency) {
  return {
    type: UPDATE_EXCHANGE_CURRENCY_TO,
    payload: currency
  }
}

export const UPDATE_AMOUNT = 'UPDATE_AMOUNT';

export function updateAmount(amount) {
  return {
    type: UPDATE_AMOUNT,
    payload: amount
  }
}
