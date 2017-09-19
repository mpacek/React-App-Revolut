import _ from 'lodash';
import { FETCH_WALLET } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
  case FETCH_WALLET:
    return _.mapKeys(action.payload.data, 'code');
  default:
    return state;
  }
}
