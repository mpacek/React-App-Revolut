import { combineReducers } from 'redux';
import WalletReducer from './reducer_wallet';
import ExchangeReducer from './reducer_exchange';

const rootReducer = combineReducers({
  wallet: WalletReducer,
  exchange: ExchangeReducer
});

export default rootReducer;
