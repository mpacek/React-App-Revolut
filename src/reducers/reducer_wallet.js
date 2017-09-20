import _ from 'lodash';
import {
  FETCH_WALLET,
  UPDATE_WALLET
} from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
  case FETCH_WALLET:
    return _.mapKeys(action.payload.data, 'code');
  case UPDATE_WALLET:
    const newState = state;
    newState[action.payload.code].amount = _.toString(action.payload.amount);

    return newState;
  default:
    return state;
  }
}
