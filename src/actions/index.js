import axios from 'axios';

export const FETCH_WALLET = 'FETCH_WALLET';
export const UPDATE_EXCHANGE_RATE = 'UPDATE_EXCHANGE_RATE';
export const UPDATE_EXCHANGE_CURRENCY_FROM = 'UPDATE_EXCHANGE_CURRENCY_FROM';
export const UPDATE_EXCHANGE_CURRENCY_TO = 'UPDATE_EXCHANGE_CURRENCY_TO';
export const UPDATE_AMOUNT_FROM = 'UPDATE_AMOUNT_FROM';

const WALLET_API_URL = "api/wallet.json";
const EXCHANGE_API_URL = "https://openexchangerates.org/api/latest.json";
const EXCHANGE_API_ID = "8b38a6b9bc064adcb16d2420457323c7";

export function fetchWallet() {
  const url = WALLET_API_URL;
  const request = axios.get(url);
  return {
    type: FETCH_WALLET,
    payload: request
  }
}

export function updateExchangeRate(exchange_from, exchange_to) {
  // TODO: in free plan of openexchangerates the base currency can be only USD
  const url =`${EXCHANGE_API_URL}?app_id=${EXCHANGE_API_ID}&symbols=${exchange_to}`;
  const request = axios.get(url);
  return {
    type: UPDATE_EXCHANGE_RATE,
    payload: request
  }
}

export function updatecurrencyFrom(currency) {
  return {
    type: UPDATE_EXCHANGE_CURRENCY_FROM,
    payload: currency
  }
}

export function updatecurrencyTo(currency) {
  return {
    type: UPDATE_EXCHANGE_CURRENCY_TO,
    payload: currency
  }
}

export function updateAmountFrom(amount) {
  return {
    type: UPDATE_AMOUNT_FROM,
    payload: amount
  }
}
