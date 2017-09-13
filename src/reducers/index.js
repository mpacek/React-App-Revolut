import { combineReducers } from 'redux';
import WalletReducer from './reducer_wallet';

const rootReducer = combineReducers({
  wallet: WalletReducer
});

export default rootReducer;
