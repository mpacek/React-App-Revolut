import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import WalletReducer from './reducer_wallet';
import ExchangeReducer from './reducer_exchange';

const rootReducer = combineReducers({
  wallet: WalletReducer,
  exchange: ExchangeReducer,
  form: formReducer
});

export default rootReducer;
