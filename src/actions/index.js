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
